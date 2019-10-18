import Device from '../schemas/Device';

class DeviceIntegrationController {
  async store(req, res) {
    req.io.emit('device:real-time', { temp: 'sd' });

    await Device.create(req.body);

    return res.json({ save: 'SUCESS' });
  }
}
export default new DeviceIntegrationController();
