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
      type: Boolean,
      required: true,
    },
    alarm: {
      type: Boolean,
      required: true,
    },
    workMode: {
      type: Boolean,
      required: true,
    },
    lock: {
      type: Boolean,
      required: true,
    },
    phase: {
      type: Number,
      required: true,
    },
    climate: {
      type: Number,
      required: true,
    },
    sensorType: {
      type: Number,
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
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Device', DeviceSchema);
