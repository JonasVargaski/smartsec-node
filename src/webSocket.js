import SocketIO from 'socket.io';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from './config/auth';

import wsControllers from './app/controllers/ws';

class WebSocket {
  init(server) {
    this.clients = {};

    this.io = SocketIO(server);
    this.middlewares();
    this.listen();
  }

  middlewares() {
    this.io.set('origins', '*:*');

    this.io.use(async (socket, next) => {
      const { token } = socket.handshake.query;
      try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);
        socket.handshake.query.user_id = decoded.id;
        return next();
      } catch (err) {
        return next(new Error('Acess Deined'));
      }
    });
  }

  async listen() {
    this.io.on('connection', async socket => {
      this.clients[socket.id] = {
        socket_id: socket.id,
        user_id: socket.handshake.query.user_id,
        device_selected: null,
      };

      wsControllers.forEach(controller => {
        controller.init(socket, this.clients);
      });

      socket.on('disconnect', async () => {
        delete this.clients[socket.id];
      });
    });
  }
}

export default new WebSocket();
