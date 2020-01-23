import Cache from '../../../lib/Cache';
import Device from '../../schemas/Device';

class MonitoringControllerWs {
  init(socket, clients) {
    socket.on('monitoring:changedevice', data =>
      this.changeDevice(socket, clients, data)
    );
  }

  async changeDevice(socket, clients, { device }) {
    clients[socket.id].device_selected = device.serial;

    let lastData = await Cache.get(`monitoring:${device.serial}:last`);

    if (!lastData) {
      lastData = await Device.findOne({ serial: device.serial }).sort({
        _id: -1,
      });
    }

    if (lastData) {
      return socket.emit('monitoring:data', lastData);
    }
    return null;
  }
}
export default new MonitoringControllerWs();
