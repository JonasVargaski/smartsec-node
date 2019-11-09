import User from '../models/User';

class AccountConfirmController {
  async update(req, res) {
    const { hash } = req.params;

    const user = await User.findOne({
      where: { validation_hash: hash, situation: 'confirmation' },
    });

    if (user) {
      await user.update({ situation: 'active' });
      return res.redirect('https://technow.net.br');
    }

    return res.send('Validation Fail');
  }
}

export default new AccountConfirmController();
