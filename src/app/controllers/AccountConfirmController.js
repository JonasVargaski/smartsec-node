import User from '../models/User';
import SendConfirmAccountService from '../services/SendConfirmAccountService';

class AccountConfirmController {
  async store(req, res) {
    try {
      const { email } = req.body;

      await SendConfirmAccountService.run({ email });

      res.end();
    } catch ({ message }) {
      res.status(401).json({ err: message });
    }
  }

  async update(req, res) {
    const { token } = req.query;

    if (token) {
      const user = await User.findOne({
        where: { validation_hash: token, situation: 'confirmation' },
      });

      if (user) {
        await user.update({ situation: 'active' });
        return res.redirect('https://technow.net.br');
      }
    }

    return res.send('Validation Fail');
  }
}

export default new AccountConfirmController();
