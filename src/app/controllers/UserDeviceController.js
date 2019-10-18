import Device from '../models/Device';

class UserDeviceController {
  async store(req, res) {
    const { serial } = req.body;

    const deviceExists = await Device.findOne({
      where: { serial },
      attributes: ['id'],
    });

    if (!deviceExists) {
      return res.json({ error: 'Device does not exists.' });
    }

    const device = await Device.create(req.body);

    return res.json(device);
  }
}
export default new UserDeviceController();
