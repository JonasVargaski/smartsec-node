import Device from '../schemas/Device';

class TestController {
  async index(req, res) {
    const data = await Device.find();

    return res.json(data);
  }

  async store(req, res) {
    const data = await Device.create({
      temp: 15,
      tempAdj: 15,
      umid: 15,
      umidAdj: 15,
      fan: true,
      alarm: true,
      workMode: true,
      lock: true,
      phase: 15,
      climate: 15,
      sensorType: 15,
      wifiMac: 'teste',
      wifiPassword: 'teste',
      firmwareVersion: 'teste',
      energy: true,
    });

    return res.json(data);
  }
}

export default new TestController();
