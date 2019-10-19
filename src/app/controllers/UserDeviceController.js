import MixDeviceUserService from '../services/MixDeviceUserService';
import UserDevice from '../models/UserDevice';

class UserDeviceController {
  async index(req, res) {
    const devices = await UserDevice.findAll({
      where: { user_id: req.userId, situation: 'active' },
      order: [['updatedAt', 'DESC']],
    });

    return res.json(devices);
  }

  async store(req, res) {
    const { serial, password, description } = req.body;
    try {
      const associate = await MixDeviceUserService.run({
        serial,
        password,
        description,
        user_id: req.userId,
      });

      return res.json(associate);
    } catch ({ message }) {
      return res.status(401).json({ error: message });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    const device = await UserDevice.findOne({
      where: { id },
    });

    await device.update(req.body);

    return res.json();
  }
}
export default new UserDeviceController();
