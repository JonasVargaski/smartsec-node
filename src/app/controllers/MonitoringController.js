import Cache from '../../lib/Cache';
import Device from '../schemas/Device';
import MonitoringBroadcastService from '../services/MonitoringBroadcastService';

class MonitoringController {
  async store(req, res) {
    const data = req.body;
    MonitoringBroadcastService.run({ io: req.io, data });

    await Cache.set(`monitoring:${data.serial}:last`, data, 60);

    const interval = await Cache.get(`monitoring:${data.serial}:interval`);

    if (!interval) {
      await Device.create(data);
      await Cache.set(`monitoring:${data.serial}:interval`, data, 60 * 5);
    }

    return res.json({ save: 'SUCESS' });
  }

  async index(req, res) {
    const data = await Device.find()
      .sort({
        _id: -1,
      })
      .limit(15);
    return res.json(data);
  }

  async onMessage({ action, socket, data }) {
    switch (action) {
      case 'change:device': {
        socket.leaveAll();
        socket.join(String(data.serial));
        socket.emit('monitoring:changedevice', data.serial);

        let lastData = await Cache.get(`monitoring:${data.serial}:last`);

        if (!lastData) {
          lastData = await Device.findOne({ serial: data.serial }).sort({
            _id: -1,
          });
        }

        if (lastData) {
          return socket.emit('monitoring:data', lastData);
        }
        return null;
      }
      default:
        break;
    }
    return null;
  }
}
export default new MonitoringController();
