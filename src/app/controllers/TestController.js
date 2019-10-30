import Device from '../schemas/Device';
import Mail from '../../lib/Mail';

class TestController {
  async index(req, res) {
    const data = await Device.find();

    return res.json(data);
  }

  async store(req, res) {
    await Mail.sendMail({
      to: ' Jonas <jonasvargaski@hotmail.com>',
      template: 'cancellation',
      subject: 'TESTE',
      text: 'teste teste',
    });

    res.json({ msg: 'OK' });
  }
}

export default new TestController();
