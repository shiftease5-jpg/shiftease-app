import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: String, required: true },
  size: { type: String, required: true },
  phone: { type: String, required: true },
  price: { type: Number, required: true },
  distance: { type: Number, required: true },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

export const Quote = mongoose.model('Quote', quoteSchema);
