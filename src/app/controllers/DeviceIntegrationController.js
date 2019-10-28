import Cache from '../../lib/Cache';
// import Device from '../schemas/Device';

class DeviceIntegrationController {
  async store(req, res) {
    req.io.emit('device:real-time', req.body);

    // await Device.create(req.body);
    await Cache.set('teste:device', req.body);
    return res.json({ save: 'SUCESS' });
  }
}
export default new DeviceIntegrationController();
