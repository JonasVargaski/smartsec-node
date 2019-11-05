import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema(
  {
    temp: {
      type: Number,
      required: true,
    },
    tempAdj: {
      type: Number,
      required: true,
    },
    umid: {
      type: Number,
      required: true,
    },
    umidAdj: {
      type: Number,
      required: true,
    },
    fan: {
      type: String,
      required: true,
    },
    alarm: {
      type: String,
      required: true,
    },
    workMode: {
      type: String,
      required: true,
    },
    lock: {
      type: String,
      required: true,
    },
    phase: {
      type: String,
      required: true,
    },
    climate: {
      type: String,
      required: true,
    },
    sensorType: {
      type: String,
      required: true,
    },
    wifiMac: {
      type: String,
      required: true,
    },
    wifiPassword: {
      type: String,
      required: true,
    },
    firmwareVersion: {
      type: String,
      required: true,
    },
    energy: {
      type: String,
      required: true,
    },
    histereseDamper: {
      type: Number,
      required: true,
    },
    histereseFlap: {
      type: Number,
      required: true,
    },
    histereseFan: {
      type: Number,
      required: true,
    },
    histereSafetyMode: {
      type: Number,
      required: true,
    },
    histereAlarm: {
      type: Number,
      required: true,
    },
    timeFlapOn: {
      type: Number,
      required: true,
    },
    timeFlapOff: {
      type: Number,
      required: true,
    },
    timeAlarmRewire: {
      type: Number,
      required: true,
    },
    timeAutoTemp: {
      type: Number,
      required: true,
    },
    acceptWifiParams: {
      type: Number,
      required: true,
    },
    histereTimeAutoTemp: {
      type: Number,
      required: true,
    },
    timeAutoFanRewire: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Device', DeviceSchema);
