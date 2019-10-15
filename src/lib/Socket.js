import socketIo from 'socket.io';

class Socket {
  constructor() {
    this.io = null;
  }

  init(server) {
    this.io = socketIo(server);
    this.io.set('origins', '*:*');
    this.io.on('connection', socket => {
      console.log(socket.id);
    });
    return this.io.sockets;
  }

  get() {
    return this.io.sockets;
  }
}

export default new Socket();
