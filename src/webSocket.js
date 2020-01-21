import SocketIO from 'socket.io';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from './config/auth';

import MonitoringController from './app/controllers/MonitoringController';

class WebSocket {
  init(server) {
    this.clients = {};

    this.io = SocketIO(server);
    this.middlewares();
    this.listenConnections();
  }

  middlewares() {
    this.io.set('origins', '*:*');

    this.io.use(async (socket, next) => {
      const { token } = socket.handshake.query;
      try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);
        socket.params.userId = decoded.id;
        return next();
      } catch (err) {
        return next(new Error('Acess Deined'));
      }
    });
  }

  async listenConnections() {
    this.io.on('connection', async socket => {
      this.clients[socket.id] = {
        user_id: socket.params.id,
      };

      console.log(this.clients);
      socket.on('join', room => {
        socket.join(room);
      });

      socket.on('monitoring', async ({ action, ...data }) => {
        MonitoringController.onMessage({
          socket,
          action,
          data,
        });
      });

      socket.on('disconnect', async () => {
        // await Session.invalidate(449);
      });
    });
  }
}

export default new WebSocket();
