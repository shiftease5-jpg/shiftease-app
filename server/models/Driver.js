import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  vehicle: { type: String, required: true },
  password: { type: String, required: true },
  rating: { type: String, default: '5.0 (New Driver)' },
  trackingId: { type: String, required: true, unique: true }
}, { timestamps: true });

export const Driver = mongoose.model('Driver', driverSchema);
