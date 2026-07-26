import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: String, required: true },
  phone: { type: String, required: true }
}, { timestamps: true });

export const Quote = mongoose.model('Quote', quoteSchema);
