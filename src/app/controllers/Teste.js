import path from 'path';
import Log from '../schemas/Log';

export default {
  async save(req, res) {
    const ip = req.clientIp;

    Log.create({ ip });
    res.sendFile(path.resolve(__dirname, '..', '..', '..', 'tmp', 'img.jpg'));
  },

  async log(req, res) {
    const logs = await Log.find();
    res.json(logs);
  },

  async deleteLog(req, res) {
    const logs = await Log.remove({});
    res.json(logs);
  },
};
