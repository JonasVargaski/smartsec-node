import Mail from '../../lib/Mail';

class ConfirmAccountMail {
  get key() {
    return 'ConfirmAccountMail';
  }

  async handle({ data }) {
    const { user, url } = data;

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Confirmação de Cadastro',
      template: 'confirmAccount',
      context: {
        user: user.name,
        url,
      },
    });
  }
}

export default new ConfirmAccountMail();
