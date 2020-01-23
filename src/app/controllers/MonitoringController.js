import Cache from '../../lib/Cache';
import Device from '../schemas/Device';
import MonitoringBroadcastService from '../services/MonitoringBroadcastService';

class MonitoringController {
  async store(req, res) {
    const data = req.body;
    MonitoringBroadcastService.run({ data });

    await Cache.set(`monitoring:${data.serial}:last`, data, 60);

    const interval = await Cache.get(`monitoring:${data.serial}:interval`);

    if (!interval) {
      await Device.create(data);
      await Cache.set(`monitoring:${data.serial}:interval`, data, 60 * 5);
    }

    return res.json({ save: 'SUCESS' });
  }

  async index(req, res) {
    const { serial } = req.query;

    const device = await Device.findOne({ serial }).sort({
      _id: -1,
    });

    if (!device) {
      return res.status(401).json({ error: 'Device not found' });
    }

    return res.json(device);
  }
}
export default new MonitoringController();
