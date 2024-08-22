import { Server } from 'http';
import { Server as SocketIO } from 'socket.io';

import { configService, Cors, Websocket } from '../../../../config/env.config';
import { Logger } from '../../../../config/logger.config';
import { InstanceDto } from '../../../dto/instance.dto';
import { waSocketServer } from '../../../server.module';

const logger = new Logger('Socket');

let io: SocketIO;

const cors = configService.get<Cors>('CORS').ORIGIN;

export const initIO = (httpServer: Server) => {
  io = new SocketIO(httpServer, {
    cors: {
      origin: cors,
    },
  });

  io.on('connection', async (socket) => {
    const room = socket.handshake.query.instanceName;
    socket.join(room);

    socket.on('StartConnection', (instance: InstanceDto) => {
      waSocketServer.startConnection(instance, io);
    });
    socket.on('logout', (instance: InstanceDto) => {
      waSocketServer.logout(instance, io);
    });
  });

  logger.info('Socket.io initialized');
  return io;
};

export const getIO = (): SocketIO => {
  logger.verbose('Getting Socket.io');

  if (!io) {
    logger.error('Socket.io not initialized');
    throw new Error('Socket.io not initialized');
  }

  return io;
};
