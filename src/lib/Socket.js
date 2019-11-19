import SocketIO from 'socket.io';
import Redis from 'ioredis';
import MonitoringController from '../app/controllers/MonitoringController';

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

    this.io.set(
      'store',
      new SocketIO.RedisStore({
        redisPub: new Redis({
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
          keyPrefix: 'socket:',
        }),
        redisSub: new Redis({
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
          keyPrefix: 'socket:',
        }),
        redisClient: new Redis({
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
          keyPrefix: 'socket:',
        }),
      })
    );

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
      socket.on('monitoring', async ({ action, ...data }) => {
        MonitoringController.onMessage({
          socket,
          action,
          ...data,
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
