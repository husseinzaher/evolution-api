import axios from 'axios';
import { isURL } from 'class-validator';

import { Auth, ConfigService, GlobalWebhook, Webhook } from '../../../../config/env.config';
import { WebhookPostDto } from '../../dto/webhook.post.dto';

export class SendWebhookService {
  public globalWebhook: GlobalWebhook;
  public globalURL: string;
  public globalApiKey: string;
  public expose: boolean;

  constructor(public readonly configService: ConfigService) {
    this.globalWebhook = this.configService.get<Webhook>('WEBHOOK').GLOBAL;
    this.globalApiKey = this.configService.get<Auth>('AUTHENTICATION').API_KEY.KEY;
    this.expose = this.configService.get<Auth>('AUTHENTICATION').EXPOSE_IN_FETCH_INSTANCES;

    this.globalURL = this.globalWebhook.URL;
  }

  public async sendWebhook(postData: WebhookPostDto) {
    try {
      if (this.globalWebhook && this.globalWebhook?.ENABLED && isURL(this.globalURL)) {
        const httpService = axios.create({ baseURL: this.globalURL });

        if (this.expose && this.globalApiKey) {
          postData['apikey'] = this.globalApiKey;
        }
        postData['from_custom_webhook'] = 'from_custom_webhook';

        await httpService.post('', postData);
      }
    } catch (error) {
      /* empty */
    }
  }
}
