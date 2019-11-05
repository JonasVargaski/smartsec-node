import Cache from '../../lib/Cache';
import Device from '../schemas/Device';

class MonitoringController {
  async store(req, res) {
    const data = req.body;

    req.io.emit('monitoring:getData', data);

    await Cache.set(`external:device:last:${data.wifiMac}`, data, 60);

    const dataDevice = await Cache.get(
      `external:device:last:record:${data.wifiMac}`
    );

    if (!dataDevice) {
      await Device.create(data);

      await Cache.set(
        `external:device:last:record:${data.wifiMac}`,
        data,
        60 * 5
      );
    }

    return res.json({ save: 'SUCESS' });
  }

  async index(req, res) {
    const data = await Device.find()
      .sort({
        _id: -1,
      })
      .limit(15);
    return res.json(data);
  }

  async onMessage({ action, socket, device }) {
    switch (action) {
      case 'getData': {
        let lastData = await Cache.get(`external:device:last:${device.serial}`);

        if (!lastData) {
          lastData = await Device.findOne({ wifiMac: device.serial }).sort({
            _id: -1,
          });
        }

        if (!lastData) {
          return null;
        }

        return socket.emit('monitoring:getData', lastData);
      }
      default:
        break;
    }
    return null;
  }
}
export default new MonitoringController();
