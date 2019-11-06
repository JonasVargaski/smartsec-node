import Queue from '../../lib/Queue';
import ConfirmAccountMail from '../jobs/ConfirmAccountMail';
import Log from '../schemas/Log';

export default {
  async email(req, res) {
    await Queue.add(ConfirmAccountMail.key, {
      user: {
        name: 'Jonas Vargaski',
        email: 'jonasvargaski@hotmail.com',
      },
      url: 'http://api.technow.net.br',
    });
    res.send('ok');
  },

  async log(req, res) {
    const logs = await Log.find();
    res.json(logs);
  },
};
