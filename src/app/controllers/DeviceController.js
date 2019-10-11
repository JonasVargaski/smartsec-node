import Device from '../schemas/Device';

class DeviceController {
  async store(req, res) {
    const info = req.query.i.split('/');

    await Device.create({
      temp: info[0],
      tempAdj: info[1],
      umid: info[2],
      umidAdj: info[3],
      fan: info[4],
      alarm: info[5],
      workMode: info[6],
      lock: info[7],
      phase: info[8],
      climate: info[9],
      sensorType: info[10],
      wifiMac: info[11],
      wifiPassword: info[12],
      firmwareVersion: info[13],
      energy: info[14],
    });

    return res.json({ save: 'SUCESS' });
  }
}
export default new DeviceController();
