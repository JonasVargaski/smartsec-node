import Device from '../schemas/Device';
import Cache from '../../lib/Cache';

class ExternalDeviceController {
  async store(req, res) {
    const data = req.body;

    req.io.emit('device:real-time', data);

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
}
export default new ExternalDeviceController();
