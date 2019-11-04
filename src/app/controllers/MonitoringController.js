import Cache from '../../lib/Cache';
import DeviceData from '../schemas/Device';

class MonitoringController {
  async onMessage({ message, socket, device }) {
    switch (message) {
      case 'get:device': {
        let lastData = await Cache.get(`external:device:last:${device.serial}`);

        if (lastData) {
          return socket.emit('device:real-time', lastData);
        }

        lastData = await DeviceData.findOne({ wifiMac: device.serial }).sort({
          _id: -1,
        });

        if (!lastData) {
          lastData = {};
        }

        return socket.emit('device:real-time', lastData);
      }
      default:
        break;
    }
    return null;
  }
}
export default new MonitoringController();
