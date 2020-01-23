import webSocket from '../../webSocket';

class MonitoringBroadcastService {
  async run({ data }) {
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

    Object.values(webSocket.clients).forEach(client => {
      if (client.device_selected === serial) {
        webSocket.io.to(client.socket_id).emit('monitoring:data', {
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
    });
  }
}

export default new MonitoringBroadcastService();
