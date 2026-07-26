import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Driver } from './models/Driver.js';
import { Quote } from './models/Quote.js';
import { Trip } from './models/Trip.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- Database Connection ---
let useMongo = false;

if (process.env.MONGO_URI && process.env.MONGO_URI !== "your_mongodb_connection_string_here") {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('✅ Connected to MongoDB Cloud successfully!');
      useMongo = true;
    })
    .catch((err) => {
      console.error('❌ Failed to connect to MongoDB. Using mock database instead.', err.message);
    });
} else {
  console.log('⚠️ No MongoDB URI found in .env. Using mock database instead.');
}

// --- Mock Database for Drivers (Fallback) ---
const driversDB = [
  {
    phone: "9876543210",
    password: "password123",
    name: "Ramesh Kumar",
    vehicle: "MH 12 AB 1234",
    rating: "4.9 (120+ Trips)",
    trackingId: "TRK-849204"
  }
];
const quotesDB = [];
const tripsDB = [];

// --- API Endpoints ---
app.post('/driver/login', async (req, res) => {
  const { phone, password } = req.body;
  
  let driver = null;
  if (useMongo) {
    driver = await Driver.findOne({ phone, password });
  } else {
    driver = driversDB.find(d => d.phone === phone && d.password === password);
  }
  
  if (driver) {
    res.json({ success: true, message: 'Login successful', driver: { _id: driver._id, name: driver.name, phone: driver.phone, vehicle: driver.vehicle, rating: driver.rating, trackingId: driver.trackingId } });
  } else {
    res.status(401).json({ success: false, message: 'Invalid phone number or password' });
  }
});

app.post('/driver/signup', async (req, res) => {
  const { name, phone, vehicle, password } = req.body;
  
  const trackingId = "TRK-" + Math.floor(100000 + Math.random() * 900000);

  if (useMongo) {
    // Check if driver already exists
    const existing = await Driver.findOne({ phone });
    if (existing) return res.status(400).json({ success: false, message: 'Phone number already registered' });
    
    const newDriver = new Driver({ name, phone, vehicle, password, trackingId });
    await newDriver.save();
    
    return res.json({ success: true, message: 'Account created! Credentials sent to WhatsApp.', driver: { _id: newDriver._id, name: newDriver.name, phone: newDriver.phone, vehicle: newDriver.vehicle, rating: newDriver.rating, trackingId: newDriver.trackingId } });
  } else {
    // Mock DB Fallback
    if (driversDB.find(d => d.phone === phone)) {
      return res.status(400).json({ success: false, message: 'Phone number already registered' });
    }
    
    const newDriver = { _id: 'mock_id_' + Date.now(), name, phone, vehicle, password, rating: "5.0 (New Driver)", trackingId };
    driversDB.push(newDriver);
    
    res.json({ success: true, message: 'Account created! Credentials sent to WhatsApp.', driver: { _id: newDriver._id, name: newDriver.name, phone: newDriver.phone, vehicle: newDriver.vehicle, rating: newDriver.rating, trackingId: newDriver.trackingId } });
  }
});

app.post('/quote', async (req, res) => {
  const { name, from, to, date, size, phone } = req.body;
  
  // Dummy Pricing Logic for Demo
  const basePrice = 1500;
  let sizeMultiplier = 1;
  if (size === '2 BHK') sizeMultiplier = 1.5;
  if (size === '3 BHK') sizeMultiplier = 2;
  if (size === '4+ BHK') sizeMultiplier = 2.5;
  if (size === 'Independent House') sizeMultiplier = 3;
  if (size === 'Office') sizeMultiplier = 4;
  
  const estimatedDistanceKm = Math.floor(Math.random() * 800) + 50; // Random distance 50-850km
  const perKmRate = 25;
  
  const calculatedPrice = Math.floor(basePrice + (estimatedDistanceKm * perKmRate) * sizeMultiplier);
  
  const newQuoteData = { 
    name, from, to, date, size, phone, 
    price: calculatedPrice, 
    distance: estimatedDistanceKm, 
    status: 'Pending' 
  };
  
  if (useMongo) {
    const newQuote = new Quote(newQuoteData);
    await newQuote.save();
    newQuoteData._id = newQuote._id;
  } else {
    newQuoteData._id = 'quote_' + Date.now();
    newQuoteData.createdAt = new Date();
    quotesDB.push(newQuoteData);
  }
  
  console.log('\n================================');
  console.log('🚨 NEW LEAD SAVED TO DATABASE! 🚨');
  console.log(`From: ${from} To: ${to}`);
  console.log(`Size: ${size} Distance: ${estimatedDistanceKm}km`);
  console.log(`Calculated Price: ₹${calculatedPrice}`);
  console.log('================================\n');
  
  res.json({ success: true, message: 'Quote calculated successfully', quote: newQuoteData });
});

app.put('/quote/:id/book', async (req, res) => {
  const { id } = req.params;
  
  if (useMongo) {
    await Quote.findByIdAndUpdate(id, { status: 'Booked' });
  } else {
    const quote = quotesDB.find(q => q._id === id);
    if (quote) quote.status = 'Booked';
  }
  
  console.log('\n================================');
  console.log(`✅ BOOKING CONFIRMED FOR QUOTE ${id}! ✅`);
  console.log('================================\n');
  
  res.json({ success: true, message: 'Booking confirmed' });
});

// Admin Data Route
app.get('/admin/data', async (req, res) => {
  if (useMongo) {
    const drivers = await Driver.find().sort({ createdAt: -1 });
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json({ success: true, drivers, quotes });
  } else {
    res.json({ success: true, drivers: driversDB, quotes: quotesDB });
  }
});

// End Trip Route
app.post('/trip/end', async (req, res) => {
  const { driverId, pickup, dropoff, price } = req.body;
  if (!driverId) return res.status(400).json({ success: false, message: 'Missing driver ID' });
  
  if (useMongo) {
    const trip = new Trip({ driverId, pickup, dropoff, price, status: 'Completed' });
    await trip.save();
    res.json({ success: true, trip });
  } else {
    const trip = { _id: Date.now().toString(), driverId, pickup, dropoff, price, status: 'Completed', createdAt: new Date() };
    tripsDB.push(trip);
    res.json({ success: true, trip });
  }
});

// Get Driver History Route
app.get('/driver/history/:driverId', async (req, res) => {
  const { driverId } = req.params;
  
  if (useMongo) {
    const trips = await Trip.find({ driverId }).sort({ createdAt: -1 });
    res.json({ success: true, trips });
  } else {
    const trips = tripsDB.filter(t => t.driverId === driverId).sort((a, b) => b.createdAt - a.createdAt);
    res.json({ success: true, trips });
  }
});

// --- WebSocket Server ---
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Customer joins a specific tracking room based on Tracking ID (Phone Number)
  socket.on('joinTrackingRoom', (trackingId) => {
    socket.join(trackingId);
    console.log(`Socket ${socket.id} joined tracking room: ${trackingId}`);
  });

  // Driver sends location updates to their specific room
  socket.on('driverLocationUpdate', (data) => {
    // data must include { trackingId: 'TRK-123456', lat: ..., lng: ..., speed: ... }
    io.to(data.trackingId).emit('customerLocationUpdate', data);
  });

  // Driver ends trip
  socket.on('driverTripEnded', (data) => {
    io.to(data.trackingId).emit('tripEnded');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Real-time tracking & Auth server running on port ${PORT}`);
});
