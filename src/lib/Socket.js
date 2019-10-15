import socketIo from 'socket.io';

class Socket {
  constructor(server) {
    this.io = socketIo(server);
    this.io.set('origins', '*:*');
    this.init();
    return this.io;
  }

  init() {
    this.io.on('connection', socket => {
      console.log(socket.id);
    });
  }
}

export default server => new Socket(server);
