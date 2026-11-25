const SavedDestination = require('../models/SavedDestination');
const { enrichWithCurrency } = require('../data/currencies');

// @desc    Get saved destinations
// @route   GET /api/saved-destinations
exports.getSavedDestinations = async (req, res, next) => {
  try {
    const saved = await SavedDestination.find({ user: req.user.id })
      .populate('destination')
      .sort({ createdAt: -1 });

    const enriched = saved.map(s => {
      const obj = s.toObject ? s.toObject() : { ...s };
      if (obj.destination) obj.destination = enrichWithCurrency(obj.destination);
      return obj;
    });

    res.status(200).json({ success: true, count: enriched.length, savedDestinations: enriched });
  } catch (error) {
    next(error);
  }
};

// @desc    Save destination
// @route   POST /api/saved-destinations
exports.saveDestination = async (req, res, next) => {
  try {
    const { destinationId, notes, rating, visitStatus } = req.body;

    const existing = await SavedDestination.findOne({ user: req.user.id, destination: destinationId });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Destination already saved' });
    }

    const saved = await SavedDestination.create({
      user: req.user.id,
      destination: destinationId,
      notes,
      rating,
      visitStatus
    });

    res.status(201).json({ success: true, savedDestination: saved });
  } catch (error) {
    next(error);
  }
};

// @desc    Update saved destination
// @route   PUT /api/saved-destinations/:id
exports.updateSavedDestination = async (req, res, next) => {
  try {
    // Allow-list: only notes, rating and visitStatus may be edited. The record is
    // matched by BOTH id and owner, and a client can never re-point `user` or
    // `destination` by injecting those fields in the body.
    const allowedFields = ['notes', 'rating', 'visitStatus'];
    const updates = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: 'No valid fields provided' });
    }

    const saved = await SavedDestination.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      updates,
      { new: true }
    );

    if (!saved) {
      return res.status(404).json({ success: false, message: 'Saved destination not found' });
    }

    res.status(200).json({ success: true, savedDestination: saved });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove saved destination
// @route   DELETE /api/saved-destinations/:id
exports.removeSavedDestination = async (req, res, next) => {
  try {
    const saved = await SavedDestination.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!saved) {
      return res.status(404).json({ success: false, message: 'Saved destination not found' });
    }

    res.status(200).json({ success: true, message: 'Destination removed from saved' });
  } catch (error) {
    next(error);
  }
};
