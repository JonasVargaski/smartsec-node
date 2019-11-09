import uuid from 'uuid/v4';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';

import Queue from '../../lib/Queue';
import ConfirmAccountMail from '../jobs/ConfirmAccountMail';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const validation_hash = uuid();

    const { id, name, email } = await User.create({
      ...req.body,
      validation_hash,
    });

    await Queue.add(ConfirmAccountMail.key, {
      user: {
        name,
        email,
      },
      url: `${process.env.APP_URL}/users/${validation_hash}/confirm`,
    });

    await Notification.create({
      user: id,
      content: `Bem vindo(a), ${name}! Adicione um dispostivo para conseguir monitorá-lo.`,
    });

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await user.update(req.body);

    const { id, name, avatar } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
      avatar,
    });
  }
}

export default new UserController();
