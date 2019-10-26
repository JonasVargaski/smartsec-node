import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      serial: Yup.string()
        .min(10)
        .required(),
      password: Yup.string()
        .min(3)
        .required(),
      description: Yup.string()
        .min(3)
        .required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation failed', messages: error.inner });
  }
};
