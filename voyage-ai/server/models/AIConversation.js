const mongoose = require('mongoose');

const AIMessageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'assistant', 'system'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
});

const AIConversationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: 'New Conversation'
  },
  type: {
    type: String,
    enum: ['assistant', 'trip-planner', 'budget-planner', 'packing-list', 'itinerary'],
    default: 'assistant'
  },
  messages: [AIMessageSchema],
  context: {
    trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
    destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
    extra: mongoose.Schema.Types.Mixed
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

AIConversationSchema.index({ user: 1, updatedAt: -1 });

module.exports = mongoose.model('AIConversation', AIConversationSchema);
