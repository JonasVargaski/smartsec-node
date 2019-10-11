class Socket {
  constructor(io) {
    this.io = io;
    this.init();
  }

  init() {
    this.io.on('connection', socket => {
      console.log(socket.id);
    });
  }
}

export default new Socket();
