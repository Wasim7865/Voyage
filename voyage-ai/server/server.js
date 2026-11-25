const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Auto-seed the database with demo data when it's empty.
// This is essential for the in-memory MongoDB fallback, which starts
// fresh on every server restart and would otherwise have no data.
const mongoose = require('mongoose');
let autoSeedStarted = false;
mongoose.connection.once('connected', async () => {
  if (autoSeedStarted || process.env.SKIP_AUTO_SEED === 'true') return;
  autoSeedStarted = true;
  try {
    const destinations = mongoose.connection.db.collection('destinations');
    const count = await destinations.countDocuments();
    if (count === 0) {
      console.log('Database empty — seeding demo data...');
      const { seedDB } = require('./seed/seed.js');
      await seedDB();
    }
  } catch (err) {
    console.error('Auto-seed failed:', err.message);
  }
});

// Connect to database
const connectDB = require('./config/db');
connectDB();

const app = express();

// Security middleware
app.use(helmet());
app.use(mongoSanitize());

// CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://voyageai.com'
    : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174'],
  credentials: true
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Dev logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/destinations', require('./routes/destinationRoutes'));
app.use('/api/trips', require('./routes/tripRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/places', require('./routes/placeRoutes'));
app.use('/api/saved-destinations', require('./routes/savedDestinationRoutes'));
app.use('/api/flights', require('./routes/flightRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});