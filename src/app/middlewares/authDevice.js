export default function authDevice(req, res, next) {
  const key = req.query.k;

  console.log('mfkdsmksdmk');

  if (!key || key !== process.env.DEVICE_KEY) {
    return res.json({ save: 'Acess Deined' });
  }

  return next();
}
