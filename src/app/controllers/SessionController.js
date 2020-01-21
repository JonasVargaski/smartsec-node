import jwt from 'jsonwebtoken';

import User from '../models/User';
import File from '../models/File';
import auth from '../../config/auth';
import uniqueID from '../../util/uniqueID';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email, situation: ['active', 'confirmation'] },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    if (user.situation === 'confirmation') {
      return res.status(403).json({
        code: 'AUTH001',
        message: 'Waiting for account confirmation',
        email,
      });
    }

    const { id, name, avatar } = user;
    const session = uniqueID();

    return res.json({
      user: {
        id,
        name,
        email,
        avatar,
      },
      session,
      token: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    });
  }
}

export default new SessionController();
