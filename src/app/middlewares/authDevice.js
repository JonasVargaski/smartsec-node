export default function authDevice(req, res, next) {
  const key = req.query.k;

  if (!key || key !== process.env.DEVICE_KEY) {
    return res.json({ save: 'Acess Deined' });
  }

  return next();
}
