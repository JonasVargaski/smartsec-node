import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Log', LogSchema);
