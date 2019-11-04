import Cache from '../../lib/Cache';
import DeviceData from '../schemas/Device';
import NormalizeDeviceService from '../services/NormalizeDeviceService';

class MonitoringController {
  async onMessage({ action, socket, device }) {
    switch (action) {
      case 'getData': {
        let lastData = await Cache.get(`external:device:last:${device.serial}`);

        if (!lastData) {
          lastData = await DeviceData.findOne({ wifiMac: device.serial }).sort({
            _id: -1,
          });
        }

        if (!lastData) {
          return null;
        }

        return socket.emit('monitoring:getData', {
          data: NormalizeDeviceService.run([lastData])[0],
        });
      }
      default:
        break;
    }
    return null;
  }
}
export default new MonitoringController();
