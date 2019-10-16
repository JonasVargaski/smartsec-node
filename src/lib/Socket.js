import socketIo from 'socket.io';
import { next } from 'sucrase/dist/parser/tokenizer';

class Socket {
  constructor() {
    this.io = null;
  }

  init(server) {
    this.io = socketIo(server);

    this.io.set('origins', '*:*');
    this.io.set('authorization', (data, fn) => {
      console.log(data.headers);
      fn(null, 0);
    });

    this.io.on('connection', socket => {
      console.log(socket.id, socket.handshake.query.token);
    });
    return this.io.sockets;
  }

  get() {
    return this.io.sockets;
  }
}

export default new Socket();
