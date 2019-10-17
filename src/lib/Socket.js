import socketIo from 'socket.io';
import Session from './Session';

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

    this.io.use((socket, next) => {
      const { token } = socket.handshake.query;
      if (!token) {
        return next(new Error('Acess Deined'));
      }
      return next();
    });

    setInterval(async () => {
      console.log((await Session.getAll('')).length);
    }, 1000);
  }

  async connections() {
    this.io.on('connection', async socket => {
      await Session.set(449, { session: socket.id, nome: 'Jonas' });

      socket.on('disconnect', async () => {
        await Session.invalidate(449);
      });
    });
  }

  get() {
    return this.io;
  }
}

export default new Socket();
