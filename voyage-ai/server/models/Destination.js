const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Destination name is required'],
    trim: true
  },
  country: {
    type: String,
    required: [true, 'Country is required']
  },
  continent: {
    type: String,
    required: true,
    enum: ['Asia', 'Europe', 'North America', 'South America', 'Africa', 'Oceania', 'Antarctica']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required']
  },
  images: [String],
  gallery: [{
    url: String,
    caption: String
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  priceRange: {
    type: String,
    enum: ['$', '$$', '$$$', '$$$$'],
    default: '$$'
  },
  avgDailyBudget: {
    type: Number,
    default: 100
  },
  currency: {
    type: String,
    default: 'USD'
  },
  languages: [String],
  timezone: String,
  bestTimeToVisit: String,
  climate: {
    type: String,
    enum: ['tropical', 'temperate', 'arid', 'mediterranean', 'continental', 'polar', 'monsoon']
  },
  tags: [String],
  highlights: [String],
  activities: [{
    name: String,
    type: { type: String, enum: ['adventure', 'cultural', 'relaxation', 'food', 'nightlife', 'nature', 'shopping', 'sightseeing'] },
    description: String,
    price: Number,
    duration: String,
    rating: Number
  }],
  coordinates: {
    lat: Number,
    lng: Number
  },
  visaRequired: {
    type: Boolean,
    default: false
  },
  safetyRating: {
    type: Number,
    min: 1,
    max: 5,
    default: 4
  },
  featured: {
    type: Boolean,
    default: false
  },
  trending: {
    type: Boolean,
    default: false
  },
  featuredOrder: Number
}, {
  timestamps: true
});

DestinationSchema.index({ name: 'text', country: 'text', description: 'text' });
DestinationSchema.index({ tags: 1 });
DestinationSchema.index({ featured: 1 });
DestinationSchema.index({ rating: -1 });

module.exports = mongoose.model('Destination', DestinationSchema);
