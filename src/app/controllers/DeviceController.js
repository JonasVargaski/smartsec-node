import Device from '../schemas/Device';
import io from '../../lib/Socket';

class DeviceController {
  async store(req, res) {
    io()
      .to('dsd')
      .emit('msdk', 'snsi');

    await Device.create(req.body);

    return res.json({ save: 'SUCESS' });
  }
}
export default new DeviceController();
