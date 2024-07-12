import { Boom } from '@hapi/boom';
import { ConnectionState, delay, DisconnectReason } from '@whiskeysockets/baileys';
import { isURL } from 'class-validator';
import EventEmitter2 from 'eventemitter2';
import qrcode, { QRCodeToDataURLOptions } from 'qrcode';
import { Server as SocketIO } from 'socket.io';
import { v4 } from 'uuid';

import { ConfigService, HttpServer, QrCode, WaBusiness } from '../../../config/env.config';
import { Logger } from '../../../config/logger.config';
import { BadRequestException, InternalServerErrorException } from '../../../exceptions';
import { ProxyController } from '../../controllers/proxy.controller';
import { InstanceDto } from '../../dto/instance.dto';
import { ChatwootService } from '../../integrations/chatwoot/services/chatwoot.service';
import { RabbitmqService } from '../../integrations/rabbitmq/services/rabbitmq.service';
import { SqsService } from '../../integrations/sqs/services/sqs.service';
import { TypebotService } from '../../integrations/typebot/services/typebot.service';
import { WebsocketService } from '../../integrations/websocket/services/websocket.service';
import { ProviderFiles } from '../../provider/sessions';
import { RepositoryBroker } from '../../repository/repository.manager';
import { AuthService } from '../../services/auth.service';
import { CacheService } from '../../services/cache.service';
import { BaileysStartupService } from '../../services/channels/whatsapp.baileys.service';
import { BusinessStartupService } from '../../services/channels/whatsapp.business.service';
import { IntegrationService } from '../../services/integration.service';
import { WAMonitoringService } from '../../services/monitor.service';
import { SettingsService } from '../../services/settings.service';
import { WebhookService } from '../../services/webhook.service';
import { Events, Integration, wa } from '../../types/wa.types';

export class WhatsappSocketController {
  private readonly logger = new Logger(WhatsappSocketController.name);

  constructor(
    private readonly waMonitor: WAMonitoringService,
    private readonly configService: ConfigService,
    private readonly repository: RepositoryBroker,
    private readonly eventEmitter: EventEmitter2,
    private readonly authService: AuthService,
    private readonly webhookService: WebhookService,
    private readonly chatwootService: ChatwootService,
    private readonly settingsService: SettingsService,
    private readonly websocketService: WebsocketService,
    private readonly rabbitmqService: RabbitmqService,
    private readonly sqsService: SqsService,
    private readonly typebotService: TypebotService,
    private readonly integrationService: IntegrationService,
    private readonly proxyService: ProxyController,
    private readonly cache: CacheService,
    private readonly chatwootCache: CacheService,
    private readonly baileysCache: CacheService,
    private readonly providerFiles: ProviderFiles,
  ) {}

  public instance: wa.Instance = {};
  public socketIo: SocketIO;
  private endSession = false;
  public phoneNumber: string;
  public mobile: string;
  public room: string;

  public async startConnection(instanceDto: InstanceDto, socketIo: SocketIO) {
    this.socketIo = socketIo;
    this.room = instanceDto.instanceName;
    const instanceName = instanceDto.instanceName;
    try {
      this.logger.verbose('websocket requested connectToWhatsapp from ' + instanceName + ' instance');

      if (!this.waMonitor.waInstances[instanceName]) {
        await this.createInstance(instanceDto);
        await delay(2000);
      }

      const WAInstance = this.waMonitor.waInstances[instanceName];

      const state = WAInstance?.connectionStatus?.state;

      this.logger.verbose('state: ' + state);

      if (!state) {
        throw new BadRequestException('The "' + instanceName + '" instance does not exist');
      }

      this.instance = WAInstance.instance;
      console.log('instance.instance', WAInstance.instance);
      // event handler
      WAInstance?.client?.ev?.process(async (events) => {
        await this.sendDataToWebsocket(Events.EVENT_TEST, events);
        console.log('connection.update', events['connection.update']);

        if (events['connection.update']) {
          console.log('events[connection.update]', events['connection.update']);
          await this.connectionUpdate(events['connection.update'], WAInstance);
        }
      });

      if (state == 'connecting') {
        await this.sendDataToWebsocket(Events.QRCODE_UPDATED, {
          instanceName: instanceName,
          qrcode: WAInstance.qrCode,
        });
        return WAInstance.qrCode;
      }

      if (state == 'close') {
        this.logger.verbose('connecting');
        await WAInstance.connectToWhatsapp(instanceDto.number, instanceDto.mobile);

        await delay(2000);
        await this.sendDataToWebsocket(Events.QRCODE_UPDATED, {
          instanceName: instanceName,
          qrcode: WAInstance.qrCode,
        });

        return WAInstance.qrCode;
      }

      if (state === 'open') {
        this.waMonitor.instanceInfo(instanceName, true).then((res) => {
          this.sendDataToWebsocket(Events.CONNECTION_OPEN, {
            instance: res[0].instance,
            state: 'open',
          });
        });
      }

      return {
        instance: {
          instanceName: instanceName,
          status: state,
        },
        qrcode: WAInstance?.qrCode,
      };
    } catch (error) {
      await this.sendDataToWebsocket(Events.ERROR, error);
      this.logger.error(error);
    }
  }

  public async createInstance({
    instanceName,
    qrcode,
    number,
    mobile,
    integration,
    token,
    chatwoot_account_id,
    chatwoot_token,
    chatwoot_url,
    chatwoot_sign_msg,
    chatwoot_reopen_conversation,
    chatwoot_conversation_pending,
    chatwoot_import_contacts,
    chatwoot_name_inbox,
    chatwoot_merge_brazil_contacts,
    chatwoot_import_messages,
    chatwoot_days_limit_import_messages,
    reject_call,
    msg_call,
    groups_ignore,
    always_online,
    read_messages,
    read_status,
    sync_full_history,
    typebot_url,
    typebot,
    typebot_expire,
    typebot_keyword_finish,
    typebot_delay_message,
    typebot_unknown_message,
    typebot_listening_from_me,
  }: InstanceDto) {
    try {
      this.logger.verbose('requested createInstance from ' + instanceName + ' instance');

      this.logger.verbose('checking duplicate token');
      await this.authService.checkDuplicateToken(token);

      if (!token && integration === Integration.WHATSAPP_BUSINESS) {
        throw new BadRequestException('token is required');
      }

      this.logger.verbose('creating instance');
      let instance: BaileysStartupService | BusinessStartupService;
      if (integration === Integration.WHATSAPP_BUSINESS) {
        instance = new BusinessStartupService(
          this.configService,
          this.eventEmitter,
          this.repository,
          this.cache,
          this.chatwootCache,
          this.baileysCache,
          this.providerFiles,
        );
      } else {
        instance = new BaileysStartupService(
          this.configService,
          this.eventEmitter,
          this.repository,
          this.cache,
          this.chatwootCache,
          this.baileysCache,
          this.providerFiles,
        );
      }

      await this.waMonitor.saveInstance({ integration, instanceName, token, number, mobile });

      instance.instanceName = instanceName;

      const instanceId = v4();

      this.sendDataToWebsocket(Events.INSTANCE_CREATE, {
        instanceName,
        instanceId: instanceId,
      });

      this.logger.verbose('instance: ' + instance.instanceName + ' created');

      this.waMonitor.waInstances[instance.instanceName] = instance;
      this.waMonitor.delInstanceTime(instance.instanceName);

      this.logger.verbose('generating hash');
      const hash = await this.authService.generateHash(
        {
          instanceName: instance.instanceName,
          instanceId: instanceId,
        },
        token,
      );

      this.logger.verbose('hash: ' + hash + ' generated');

      this.logger.verbose('creating settings');
      const settings: wa.LocalSettings = {
        reject_call: reject_call || false,
        msg_call: msg_call || '',
        groups_ignore: groups_ignore || true,
        always_online: always_online || false,
        read_messages: read_messages || false,
        read_status: read_status || false,
        sync_full_history: sync_full_history ?? false,
      };

      this.logger.verbose('settings: ' + JSON.stringify(settings));

      this.settingsService.create(instance, settings);

      let webhook_wa_business = null,
        access_token_wa_business = '';

      if (integration === Integration.WHATSAPP_BUSINESS) {
        if (!number) {
          throw new BadRequestException('number is required');
        }
        const urlServer = this.configService.get<HttpServer>('SERVER').URL;
        webhook_wa_business = `${urlServer}/webhook/whatsapp/${encodeURIComponent(instance.instanceName)}`;
        access_token_wa_business = this.configService.get<WaBusiness>('WA_BUSINESS').TOKEN_WEBHOOK;
      }

      this.integrationService.create(instance, {
        integration,
        number,
        token,
      });
      if (!chatwoot_account_id || !chatwoot_token || !chatwoot_url) {
        let getQrcode: wa.QrCode;

        if (qrcode) {
          this.logger.verbose('creating qrcode');
          await instance.connectToWhatsapp(number, mobile);
          await delay(2000);
          getQrcode = instance.qrCode;
        }

        const result = {
          instance: {
            instanceName: instance.instanceName,
            instanceId: instanceId,
            integration: integration,
            webhook_wa_business,
            access_token_wa_business,
            status: 'created',
          },
          hash,
          typebot: {
            enabled: typebot_url ? true : false,
            url: typebot_url,
            typebot,
            expire: typebot_expire,
            keyword_finish: typebot_keyword_finish,
            delay_message: typebot_delay_message,
            unknown_message: typebot_unknown_message,
            listening_from_me: typebot_listening_from_me,
          },
          settings,
          qrcode: getQrcode,
        };

        this.logger.verbose('instance created');
        this.logger.verbose(result);

        return result;
      }

      if (!chatwoot_account_id) {
        throw new BadRequestException('account_id is required');
      }

      if (!chatwoot_token) {
        throw new BadRequestException('token is required');
      }

      if (!chatwoot_url) {
        throw new BadRequestException('url is required');
      }

      if (!isURL(chatwoot_url, { require_tld: false })) {
        throw new BadRequestException('Invalid "url" property in chatwoot');
      }

      if (chatwoot_sign_msg !== true && chatwoot_sign_msg !== false) {
        throw new BadRequestException('sign_msg is required');
      }

      if (chatwoot_reopen_conversation !== true && chatwoot_reopen_conversation !== false) {
        throw new BadRequestException('reopen_conversation is required');
      }

      if (chatwoot_conversation_pending !== true && chatwoot_conversation_pending !== false) {
        throw new BadRequestException('conversation_pending is required');
      }

      const urlServer = this.configService.get<HttpServer>('SERVER').URL;

      try {
        this.chatwootService.create(instance, {
          enabled: true,
          account_id: chatwoot_account_id,
          token: chatwoot_token,
          url: chatwoot_url,
          sign_msg: chatwoot_sign_msg || false,
          name_inbox: chatwoot_name_inbox ?? instance.instanceName.split('-cwId-')[0],
          number,
          reopen_conversation: chatwoot_reopen_conversation || false,
          conversation_pending: chatwoot_conversation_pending || false,
          import_contacts: chatwoot_import_contacts ?? true,
          merge_brazil_contacts: chatwoot_merge_brazil_contacts ?? false,
          import_messages: chatwoot_import_messages ?? true,
          days_limit_import_messages: chatwoot_days_limit_import_messages ?? 60,
          auto_create: true,
        });
      } catch (error) {
        this.logger.log(error);
      }

      this.sendDataToWebsocket(Events.INSTANCE_CREATED_DATA, {
        instance: {
          instanceName: instance.instanceName,
          instanceId: instanceId,
          integration: integration,
          webhook_wa_business,
          access_token_wa_business,
          status: 'created',
        },
        hash,
        typebot: {
          enabled: typebot_url ? true : false,
          url: typebot_url,
          typebot,
          expire: typebot_expire,
          keyword_finish: typebot_keyword_finish,
          delay_message: typebot_delay_message,
          unknown_message: typebot_unknown_message,
          listening_from_me: typebot_listening_from_me,
        },
        settings,
        chatwoot: {
          enabled: true,
          account_id: chatwoot_account_id,
          token: chatwoot_token,
          url: chatwoot_url,
          sign_msg: chatwoot_sign_msg || false,
          reopen_conversation: chatwoot_reopen_conversation || false,
          conversation_pending: chatwoot_conversation_pending || false,
          merge_brazil_contacts: chatwoot_merge_brazil_contacts ?? false,
          import_contacts: chatwoot_import_contacts ?? true,
          import_messages: chatwoot_import_messages ?? true,
          days_limit_import_messages: chatwoot_days_limit_import_messages || 60,
          number,
          name_inbox: chatwoot_name_inbox ?? instance.instanceName,
          webhook_url: `${urlServer}/chatwoot/webhook/${encodeURIComponent(instance.instanceName)}`,
        },
      });
    } catch (error) {
      this.logger.error(error.message[0]);
      throw new BadRequestException(error.message[0]);
    }
  }

  public async logout({ instanceName }: InstanceDto, socketIo) {
    this.socketIo = socketIo;

    this.logger.verbose('requested logout from ' + instanceName + ' instance');
    const { instance } = await this.connectionState({ instanceName });

    if (instance.state === 'close') {
      await this.sendDataToWebsocket(Events.CONNECTION_CLOSED, { instanceName: instanceName });
      throw new BadRequestException('The "' + instanceName + '" instance is not connected');
    }

    try {
      await this.waMonitor.waInstances[instanceName]?.logoutInstance();

      await this.sendDataToWebsocket(Events.CONNECTION_LOGGED_OUT, {
        instanceName: instanceName,
        message: 'Instance logged out',
      });
    } catch (error) {
      throw new InternalServerErrorException(error.toString());
    }
  }

  public async connectionState({ instanceName }: InstanceDto) {
    this.logger.verbose('requested connectionState from ' + instanceName + ' instance');
    return {
      instance: {
        instanceName: instanceName,
        state: this.waMonitor.waInstances[instanceName]?.connectionStatus?.state,
      },
    };
  }

  public async connectionUpdate({ qr, connection, lastDisconnect }: Partial<ConnectionState>, WAInstance) {
    if (qr) {
      console.log('this.instance.qrcode.count', this.instance);
      console.log('this.qr', this.instance, connection);
      this.logger.verbose('QR code found');
      if (this.instance.qrcode.count === this.configService.get<QrCode>('QRCODE').LIMIT) {
        await this.sendDataToWebsocket(Events.QRCODE_LIMIT_REACHED, {
          instanceName: this.instance.name,

          message: 'QR code limit reached, please login again',
          statusCode: DisconnectReason.badSession,
        });

        this.logger.verbose('Sending data to webhook in event CONNECTION_UPDATE');
        await this.sendDataToWebsocket(Events.CONNECTION_UPDATE, {
          instanceName: this.instance.name,
          state: 'refused',
          statusReason: DisconnectReason.connectionClosed,
        });

        this.logger.verbose('endSession defined as true');
        this.endSession = true;

        this.logger.verbose('Emmiting event logout.instance');
        await this.sendDataToWebsocket(Events.NO_CONNECTION, this.instance.name);
      }

      this.logger.verbose('Incrementing QR code count');
      this.instance.qrcode.count++;

      const color = this.configService.get<QrCode>('QRCODE').COLOR;

      const optsQrcode: QRCodeToDataURLOptions = {
        margin: 3,
        scale: 4,
        errorCorrectionLevel: 'H',
        color: { light: '#ffffff', dark: color },
      };

      if (this.phoneNumber) {
        await delay(2000);
        this.instance.qrcode.pairingCode = await WAInstance.client.requestPairingCode(this.phoneNumber);
      } else {
        this.instance.qrcode.pairingCode = null;
      }

      this.logger.verbose('Generating QR code');
      qrcode.toDataURL(qr, optsQrcode, (error, base64) => {
        if (error) {
          this.logger.error('Qrcode generate failed:' + error.toString());
          return;
        }

        this.instance.qrcode.base64 = base64;
        this.instance.qrcode.code = qr;
        Events.QRCODE_UPDATED;

        this.sendDataToWebsocket(Events.QRCODE_UPDATED, {
          instanceName: this.instance.name,
          qrcode: {
            pairingCode: this.instance.qrcode.pairingCode,
            code: qr,
            base64,
            count: this.instance.qrcode.count,
          },
        });
      });
    }

    if (connection === 'close') {
      this.logger.verbose('Connection closed');
      const shouldReconnect = (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) {
        this.logger.verbose('Reconnecting to whatsapp');
        await WAInstance.connectToWhatsapp();
      } else {
        this.logger.verbose('Do not reconnect to whatsapp');
        this.logger.verbose('Sending data to webhook in event STATUS_INSTANCE');
        await this.sendDataToWebsocket(Events.STATUS_INSTANCE, {
          instance: this.instance.name,
          status: 'closed',
        });
      }
    }

    if (connection === 'open') {
      this.logger.verbose('Connection opened');
      this.instance.wuid = WAInstance.client.user.id.replace(/:\d+/, '');
      this.instance.profilePictureUrl = (await WAInstance.profilePicture(this.instance.wuid)).profilePictureUrl;
      const formattedWuid = this.instance.wuid.split('@')[0];
      const formattedName = this.instance.name;
      this.logger.info(
        `
        ┌─────────────────────────────────────────┐
        │ CONNECTED TO WHATSAPP Socket Server     │
        └─────────────────────────────────────────┘
        `.replace(/^ +/gm, '  '),
      );
      this.logger.info(
        `
        wuid: ${formattedWuid}
        name: ${formattedName}
      `,
      );

      await this.sendDataToWebsocket(Events.CONNECTION_OPEN, {
        instance: this.instance,
        state: 'open',
      });
    }

    if (connection === 'connecting') {
      if (this.mobile) await WAInstance.sendMobileCode();
    }
  }

  private async sendDataToWebsocket<T = any>(event: Events, data: T) {
    console.log('send to websocket', event, data);
    this.socketIo.to(this.room).emit(event, data);
  }
}
