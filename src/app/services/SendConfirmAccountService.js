import uniqueID from '../../util/uniqueID';
import User from '../models/User';
import ConfirmAccountMail from '../jobs/ConfirmAccountMail';
import Queue from '../../lib/Queue';

class SendConfirmAccountService {
  async run({ email }) {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('User does not exists');
    }

    if (user.situation === 'confirmation') {
      const validation_hash = uniqueID();
      await user.update({ validation_hash });

      await Queue.add(ConfirmAccountMail.key, {
        user: {
          name: user.name,
          email: user.email,
        },
        url: `${process.env.APP_URL}/users/confirm?token=${validation_hash}`,
      });

      return user;
    }
    throw new Error('The account has already been verified');
  }
}

export default new SendConfirmAccountService();
