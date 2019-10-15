import Device from '../schemas/Device';
import io from '../../lib/Socket';

class DeviceController {
  async store(req, res) {
    console.log(io.get());

    await Device.create(req.body);

    return res.json({ save: 'SUCESS' });
  }
}
export default new DeviceController();
