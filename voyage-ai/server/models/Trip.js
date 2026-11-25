const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Trip title is required'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination'
  },
  destinationName: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  status: {
    type: String,
    enum: ['planning', 'upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'planning'
  },
  coverImage: {
    type: String,
    default: ''
  },
  travelers: {
    type: Number,
    min: 1,
    default: 1
  },
  budget: {
    total: { type: Number, default: 0 },
    spent: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' },
    breakdown: {
      accommodation: { type: Number, default: 0 },
      transportation: { type: Number, default: 0 },
      food: { type: Number, default: 0 },
      activities: { type: Number, default: 0 },
      shopping: { type: Number, default: 0 },
      other: { type: Number, default: 0 }
    }
  },
  itinerary: [{
    day: Number,
    date: Date,
    title: String,
    activities: [{
      time: String,
      title: String,
      description: String,
      location: String,
      category: { type: String, enum: ['transport', 'accommodation', 'food', 'activity', 'sightseeing', 'shopping', 'other'] },
      cost: { type: Number, default: 0 },
      notes: String,
      completed: { type: Boolean, default: false }
    }],
    notes: String
  }],
  accommodation: {
    name: String,
    address: String,
    checkIn: Date,
    checkOut: Date,
    confirmationNumber: String,
    cost: Number,
    notes: String
  },
  transportation: [{
    type: { type: String, enum: ['flight', 'train', 'bus', 'car', 'ferry', 'other'] },
    from: String,
    to: String,
    departureTime: Date,
    arrivalTime: Date,
    bookingRef: String,
    cost: Number,
    notes: String
  }],
  notes: {
    type: String,
    default: ''
  },
  tags: [String],
  isPublic: {
    type: Boolean,
    default: false
  },
  aiGenerated: {
    type: Boolean,
    default: false
  },
  companions: [{
    name: String,
    email: String,
    role: { type: String, enum: ['owner', 'editor', 'viewer'], default: 'viewer' }
  }]
}, {
  timestamps: true
});

TripSchema.index({ user: 1, status: 1 });
TripSchema.index({ user: 1, startDate: -1 });

module.exports = mongoose.model('Trip', TripSchema);
