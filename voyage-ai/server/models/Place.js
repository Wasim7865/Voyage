const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Place name is required'],
    trim: true
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true
  },
  category: {
    type: String,
    enum: ['restaurant', 'hotel', 'attraction', 'museum', 'park', 'beach', 'market', 'temple', 'monument', 'shopping', 'nightlife', 'other'],
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  image: String,
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  priceLevel: {
    type: String,
    enum: ['free', '$', '$$', '$$$', '$$$$'],
    default: '$$'
  },
  address: String,
  coordinates: {
    lat: Number,
    lng: Number
  },
  openingHours: String,
  website: String,
  phone: String,
  tags: [String],
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

PlaceSchema.index({ destination: 1, category: 1 });
PlaceSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Place', PlaceSchema);
