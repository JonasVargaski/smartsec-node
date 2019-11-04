/* eslint-disable no-underscore-dangle */
class NormalizeDeviceService {
  run(dataStore) {
    return dataStore.map(data => ({
      id: data._id,
      climate: this.getClimate(data.climate),
      phase: this.getClimate(data.phase),
      alarm: data.alarm ? 'Ligado' : 'Desligado',
      fan: data.fan ? 'Ligada' : 'Desligada',
      lock: data.lock ? 'Travado' : 'Destravado',
      umid: `${data.umid} ${data.sensorType ? '%' : '°F'}`,
      umidAdj: `${data.umidAdj} ${data.sensorType ? '%' : '°F'}`,
      temp: `${data.temp} °F`,
      tempAdj: `${data.temp} °F`,
      workMode: data.workMode ? 'Automatico' : 'Manual',
      wifiMac: data.wifiMac,
      firmwareVersion: data.firmwareVersion,
    }));
  }

  getClimate(id) {
    switch (id) {
      case 0:
        return 'Seco';
      case 1:
        return 'Normal';
      case 2:
        return 'Umido';
      default:
        return '';
    }
  }

  getPhase(id) {
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
}

export default new NormalizeDeviceService();
