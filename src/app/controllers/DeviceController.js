import Device from '../schemas/Device';

class DeviceController {
  async store(req, res) {
    await Device.create(req.body);

    return res.json({ save: 'SUCESS' });
  }
}
export default new DeviceController();
