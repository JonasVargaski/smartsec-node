class MonitoringBroadcastService {
  async run({ io, data }) {
    const {
      temp,
      tempAdj,
      umid,
      umidAdj,
      fan,
      alarm,
      lock,
      phase,
      climate,
      sensorType,
      serial,
      date,
    } = data;

    io.in(serial).emit('monitoring:data', {
      temp,
      tempAdj,
      umid,
      umidAdj,
      fan,
      alarm,
      lock,
      phase,
      climate,
      sensorType,
      date,
    });
  }
}

export default new MonitoringBroadcastService();
