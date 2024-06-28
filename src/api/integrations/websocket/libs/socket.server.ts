import { Server } from 'http';
import { Server as SocketIO } from 'socket.io';

import { configService, Cors, Websocket } from '../../../../config/env.config';
import { Logger } from '../../../../config/logger.config';
import { InstanceDto } from '../../../dto/instance.dto';
import { waSocketServer } from '../../../server.module';

// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const wa = require('../../../../server/whatsapp.js');

const logger = new Logger('Socket');

let io: SocketIO;

const cors = configService.get<Cors>('CORS').ORIGIN;

export const initIO = (httpServer: Server) => {
  if (configService.get<Websocket>('WEBSOCKET')?.ENABLED) {
    io = new SocketIO(httpServer, {
      cors: {
        origin: cors,
      },
    });

    io.on('connection', (socket) => {
      logger.info('User connected');

      socket.on('StartConnection', (instance: InstanceDto) => {
        waSocketServer.startConnection(instance, io);
      });

      socket.on('logout', (instance: InstanceDto) => {
        waSocketServer.logout(instance, io);
      });

      socket.on('disconnect', () => {
        logger.info('User disconnected');
      });
    });

    logger.info('Socket.io initialized');
    return io;
  }
  return null;
};

export const getIO = (): SocketIO => {
  logger.verbose('Getting Socket.io');

  if (!io) {
    logger.error('Socket.io not initialized');
    throw new Error('Socket.io not initialized');
  }

  return io;
};
