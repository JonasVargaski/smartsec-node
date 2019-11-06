import Queue from '../../lib/Queue';
import ConfirmAccountMail from '../jobs/ConfirmAccountMail';

export default {
  async teste(req, res) {
    await Queue.add(ConfirmAccountMail.key, {
      user: {
        name: 'Jonas Vargaski',
        email: 'jonasvargaski@hotmail.com',
      },
      url: 'http://api.technow.net.br',
    });
    res.send('ok');
  },
};
