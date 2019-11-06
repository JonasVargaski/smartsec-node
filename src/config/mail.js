export default {
  host: 'smtp-relay.sendinblue.com',
  port: 587,
  secure: false,
  auth: {
    user: 'jonasvargaski@gmail.com',
    pass: '7QKJ0I4d3zrwvFa1',
  },
  default: {
    from: 'TechNow <noreply@technow.net.br>',
  },
};
// export default {
//   host: process.env.MAIL_HOST,
//   port: process.env.MAIL_PORT,
//   secure: false,
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS,
//   },
//   default: {
//     from: 'TechNow <noreply@technow.net.br>',
//   },
// };
