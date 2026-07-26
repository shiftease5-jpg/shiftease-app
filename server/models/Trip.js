import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  pickup: { type: String, required: true },
  dropoff: { type: String, required: true },
  price: { type: String, required: true },
  status: { type: String, default: 'Completed' }
}, { timestamps: true });

export const Trip = mongoose.model('Trip', tripSchema);
