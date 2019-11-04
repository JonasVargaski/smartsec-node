import socketIo from 'socket.io';
// import Session from './Session';

import MonitoringController from '../app/controllers/MonitoringController';

class Socket {
  constructor() {
    this.io = null;
  }

  init(server) {
    this.io = socketIo(server);

    this.middlewares();
    this.connections();

    return this.io;
  }

  middlewares() {
    this.io.set('origins', '*:*');

    // this.io.use((socket, next) => {
    //   const { token } = socket.handshake.query;
    //   if (!token) {
    //     return next(new Error('Acess Deined'));
    //   }
    //   return next();
    // });
  }

  async connections() {
    this.io.on('connection', async socket => {
      socket.on('monitoring', async data => {
        MonitoringController.onMessage({
          socket,
          data,
        });
      });

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
