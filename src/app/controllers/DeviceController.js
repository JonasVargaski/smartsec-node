import Device from '../models/Device';

class DeviceController {
  async store(req, res) {
    const { serial } = req.body;

    const deviceExists = await Device.findOne({
      where: { serial },
    });

    if (deviceExists) {
      return res.json({ error: 'Device already exists.' });
    }

    const device = await Device.create(req.body);

    return res.json(device);
  }
}
export default new DeviceController();
