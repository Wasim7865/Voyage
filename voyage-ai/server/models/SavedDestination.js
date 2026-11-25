const mongoose = require('mongoose');

const SavedDestinationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  visitStatus: {
    type: String,
    enum: ['wishlist', 'planned', 'visited'],
    default: 'wishlist'
  }
}, {
  timestamps: true
});

SavedDestinationSchema.index({ user: 1, destination: 1 }, { unique: true });

module.exports = mongoose.model('SavedDestination', SavedDestinationSchema);
