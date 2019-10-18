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

  async update(req, res) {
    const device = await Device.findByPk(req.params.id);

    if (!device) {
      return res.json({ error: 'Device does not exists.' });
    }

    const {
      id,
      description,
      serial,
      situation,
      password,
    } = await device.update(req.body);

    return res.json({ id, description, serial, situation, password });
  }
}
export default new DeviceController();
