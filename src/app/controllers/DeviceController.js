import Device from '../models/Device';

class DeviceController {
  async index(req, res) {
    const devices = await Device.findAll({
      where: { situation: ['active', 'inactive'] },
      order: [['updatedAt', 'DESC']],
    });

    return res.json(devices);
  }

  async store(req, res) {
    const { serial } = req.body;

    let device = await Device.findOne({
      where: { serial },
    });

    if (device) {
      device.situation = 'active';
      await device.update();

      return res.json(device);
    }

    device = await Device.create(req.body);

    return res.json(device);
  }

  async update(req, res) {
    const device = await Device.findByPk(req.params.id);

    if (!device) {
      return res.json({ error: 'Device does not exists.' });
    }

    await device.update(req.body);

    return res.json(device);
  }
}
export default new DeviceController();
