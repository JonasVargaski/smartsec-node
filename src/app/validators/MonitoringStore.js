import * as Yup from 'yup';

export default async (req, res, next) => {
  function getClimate(id) {
    switch (id) {
      case 0:
        return 'Seco';
      case 1:
        return 'Normal';
      case 2:
        return 'Úmido';
      default:
        return '';
    }
  }

  function getPhase(id) {
    switch (id) {
      case 0:
        return 'Amarelação';
      case 1:
        return 'Murchamento';
      case 2:
        return 'Secagem da Folha';
      case 3:
        return 'Secagem do Talo';
      default:
        return '';
    }
  }

  try {
    const schemaInfo = Yup.object().shape({
      temp: Yup.number().required(),
      tempAdj: Yup.number().required(),
      umid: Yup.number().required(),
      umidAdj: Yup.number().required(),
      fan: Yup.string().required(),
      alarm: Yup.string().required(),
      workMode: Yup.string().required(),
      lock: Yup.string().required(),
      phase: Yup.string().required(),
      climate: Yup.string().required(),
      sensorType: Yup.string().required(),
      wifiMac: Yup.string().required(),
      wifiPassword: Yup.number().required(),
      firmwareVersion: Yup.string().required(),
      energy: Yup.string().required(),
    });

    const schemaParams = Yup.object().shape({
      typeSensor: Yup.number().required(),
      histereseDamper: Yup.number().required(),
      histereseFlap: Yup.number().required(),
      histereseFan: Yup.number().required(),
      histereSafetyMode: Yup.number().required(),
      histereAlarm: Yup.number().required(),
      timeFlapOn: Yup.number().required(),
      timeFlapOff: Yup.number().required(),
      timeAlarmRewire: Yup.number().required(),
      timeAutoTemp: Yup.number().required(),
      acceptWifiParams: Yup.number().required(),
      wifiPassword: Yup.number().required(),
      histereTimeAutoTemp: Yup.number().required(),
      timeAutoFanRewire: Yup.number().required(),
    });

    const i = req.query.i.split('|');
    const p = req.query.p.split('|');

    const info = {
      temp: parseFloat(i[0]),
      tempAdj: parseFloat(i[1]),
      umid: parseFloat(i[2]),
      umidAdj: parseFloat(i[3]),
      fan: parseFloat(i[4]) === 1 ? 'Ligada' : 'Desligada',
      alarm: parseFloat(i[5]) === 1 ? 'Ligado' : 'Desligado',
      workMode: parseFloat(i[6]) === 1 ? 'Automático' : 'Manual',
      lock: parseFloat(i[7]) === 1 ? 'Travado' : 'Destravado',
      phase: getPhase(parseFloat(i[8])),
      climate: getClimate(parseFloat(i[9])),
      sensorType: parseFloat(i[10]) === 1 ? '°F' : '%',
      wifiMac: i[11],
      wifiPassword: parseFloat(i[12]),
      firmwareVersion: i[13],
      energy: parseFloat(i[14]) === 1 ? 'Energia' : 'Bateria',
    };

    const params = {
      typeSensor: parseFloat(p[0]),
      histereseDamper: parseFloat(p[1]),
      histereseFlap: parseFloat(p[2]),
      histereseFan: parseFloat(p[3]),
      histereSafetyMode: parseFloat(p[4]),
      histereAlarm: parseFloat(p[5]),
      timeFlapOn: parseFloat(p[6]),
      timeFlapOff: parseFloat(p[7]),
      timeAlarmRewire: parseFloat(p[8]),
      timeAutoTemp: parseFloat(p[9]),
      acceptWifiParams: parseFloat(p[10]),
      wifiPassword: parseFloat(p[11]),
      histereTimeAutoTemp: parseFloat(p[12]),
      timeAutoFanRewire: parseFloat(p[13]),
    };

    await schemaInfo.validate(info, { abortEarly: false });
    await schemaParams.validate(params, { abortEarly: false });

    req.body = {
      ...info,
      ...params,
    };

    return next();
  } catch (error) {
    return res.status(400).json({ save: 'FAIL', error });
  }
};
