import Device from '../models/Device';
import UserDevice from '../models/UserDevice';

class MixDeviceUserService {
  async run({ serial, password, description, user_id }) {
    const device = await Device.findOne({
      where: { serial, password, situation: ['active', 'inactive'] },
      attributes: ['id'],
    });

    if (!device) {
      throw new Error('Device does not exists.');
    }

    let associate = await UserDevice.findOne({
      where: { user_id, device_id: device.id },
    });

    if (associate) {
      if (associate.situation === 'inactive') {
        await associate.update({
          situation: 'active',
        });
      } else {
        throw new Error('Device is already associated with the user.');
      }
    } else {
      associate = await UserDevice.create({
        description,
        user_id,
        device_id: device.id,
      });
    }

    return {
      id: associate.id,
      description,
      updatedAt: associate.updatedAt,
      device: {
        id: device.id,
        serial,
      },
    };
  }
}

export default new MixDeviceUserService();
