import Device from '../schemas/Device';

class TestController {
  async index(req, res) {
    const data = await Device.find();

    return res.json(data);
  }
}

export default new TestController();
