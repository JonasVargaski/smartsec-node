import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async function decodeToken(encodedJwt) {
  if (!encodedJwt) {
    return null;
  }

  const [, token] = encodedJwt.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
