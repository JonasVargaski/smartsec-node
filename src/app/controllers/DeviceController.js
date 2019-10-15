import Device from '../schemas/Device';
import Socket from '../../socket';

class DeviceController {
  async store(req, res) {
    Socket.io.emit('device:real-time', req.body);

    await Device.create(req.body);

    return res.json({ save: 'SUCESS' });
  }
}
export default new DeviceController();
