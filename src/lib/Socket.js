import socketIo from 'socket.io';
// import Session from './Session';

import Device from '../app/schemas/Device';

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
      // await Session.set(449, { session: socket.id, nome: 'Jonas' });

      socket.on('get:device', async ({ device }) => {
        // const data = await Device.findOne({}).sort({ _id: -1 });
        // socket.emit('device:real-time', data || {});
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
