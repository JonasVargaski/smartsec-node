class Socket {
  init(io) {
    this.io = io;

    this.io.on('connection', socket => {
      console.log(socket.id);
    });
  }
}

export default new Socket();
