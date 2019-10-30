import Device from '../schemas/Device';
import Mail from '../../lib/Mail';

class TestController {
  async index(req, res) {
    const data = await Device.find();

    return res.json(data);
  }

  async store(req, res) {
    const email = await Mail.sendMail({
      to: ' Jonas <jonasvargaski@hotmail.com>',
      template: 'cancellation',
      subject: 'Confirmar Cadastro',
      context: {
        user: 'Jonas Vargaski',
        link: 'https://technow.net.br/singin',
      },
    });

    res.json({ msg: 'OK', email });
  }
}

export default new TestController();
