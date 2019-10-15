import socketIo from 'socket.io';

class Socket {
  constructor(server) {
    this.io = socketIo(server);
    this.io.set('origins', '*:*');
  }

  init() {
    this.io.on('connection', socket => {
      console.log(socket.id);
    });
    return this.io.sockets;
  }
}

export default server => new Socket(server).init();
