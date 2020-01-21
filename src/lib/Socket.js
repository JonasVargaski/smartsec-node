import SocketIO from 'socket.io';
import MonitoringController from '../app/controllers/MonitoringController';
import Session from './Session';

class Socket {
  constructor() {
    this.io = null;
  }

  init(server) {
    this.io = SocketIO(server);

    this.middlewares();
    this.connections();

    return this.io;
  }

  middlewares() {
    this.io.set('origins', '*:*');

    this.io.use((socket, next) => {
      const { token } = socket.handshake.query;
      if (!token) {
        return next(new Error('Acess Deined'));
      }
      socket.params = socket.handshake.query;
      return next();
    });
  }

  async connections() {
    this.io.on('connection', async socket => {
      console.log(socket.params);
      //  await Session.new(socket.id)

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

      setInterval(() => {
        socket.to('sala').emit('monitoring', '11111111111');
        socket.to('sala2').emit('monitoring', '22222222');
      }, 1000);

      socket.on('disconnect', async () => {
        // await Session.invalidate(449);
      });
    });
  }

  get() {
    return this.io;
  }
}

export default new Socket();
