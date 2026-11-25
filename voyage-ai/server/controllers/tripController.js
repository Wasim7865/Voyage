const Trip = require('../models/Trip');
const { enrichWithCurrency } = require('../data/currencies');

// @desc    Get all trips for user
// @route   GET /api/trips
exports.getTrips = async (req, res, next) => {
  try {
    const { status, sort, page = 1, limit = 10 } = req.query;
    let query = { user: req.user.id };

    if (status) query.status = status;

    let sortOption = { startDate: -1 };
    if (sort === 'upcoming') sortOption = { startDate: 1 };
    if (sort === 'newest') sortOption = { createdAt: -1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Trip.countDocuments(query);
    const trips = await Trip.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('destination', 'name country image currency');

    const enriched = trips.map(t => {
      const obj = t.toObject ? t.toObject() : { ...t };
      if (obj.destination) obj.destination = enrichWithCurrency(obj.destination);
      return obj;
    });

    res.status(200).json({
      success: true,
      count: enriched.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      trips: enriched
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single trip
// @route   GET /api/trips/:id
exports.getTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate('destination')
      .populate('user', 'name email avatar');

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    if (trip.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const tripObj = trip.toObject ? trip.toObject() : { ...trip };
    if (tripObj.destination) tripObj.destination = enrichWithCurrency(tripObj.destination);

    res.status(200).json({ success: true, trip: tripObj });
  } catch (error) {
    next(error);
  }
};

// @desc    Create trip
// @route   POST /api/trips
exports.createTrip = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const trip = await Trip.create(req.body);
    res.status(201).json({ success: true, trip });
  } catch (error) {
    next(error);
  }
};

// @desc    Update trip
// @route   PUT /api/trips/:id
exports.updateTrip = async (req, res, next) => {
  try {
    let trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    if (trip.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // Allow-list: never let a client change the owner (user), the destination
    // reference, budget, itinerary, AI flags, or companions (roles/permissions).
    // Budget and itinerary have their own dedicated endpoints below.
    const allowedFields = [
      'title', 'description', 'destinationName', 'startDate', 'endDate',
      'status', 'coverImage', 'travelers', 'notes', 'tags', 'isPublic',
      'accommodation', 'transportation'
    ];
    const updates = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    trip = await Trip.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, trip });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete trip
// @route   DELETE /api/trips/:id
exports.deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    if (trip.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await Trip.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Trip deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Update trip itinerary
// @route   PUT /api/trips/:id/itinerary
exports.updateItinerary = async (req, res, next) => {
  try {
    let trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    if (trip.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    trip.itinerary = req.body.itinerary;
    await trip.save();

    res.status(200).json({ success: true, trip });
  } catch (error) {
    next(error);
  }
};

// @desc    Update trip budget
// @route   PUT /api/trips/:id/budget
exports.updateBudget = async (req, res, next) => {
  try {
    let trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    if (trip.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // Only numeric spend fields may be updated here. Currency is fixed (USD for
    // account surfaces) and no other trip fields may be smuggled in through the
    // spread — a raw `{...trip.budget, ...req.body}` could inject the owner id,
    // currency, or arbitrary keys.
    const { total, spent, breakdown } = req.body;
    const updates = {};
    if (total !== undefined) updates.total = total;
    if (spent !== undefined) updates.spent = spent;
    if (breakdown !== undefined && typeof breakdown === 'object' && !Array.isArray(breakdown)) updates.breakdown = breakdown;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: 'No valid budget fields provided' });
    }

    trip.budget = { ...trip.budget, ...updates };
    await trip.save();

    res.status(200).json({ success: true, trip });
  } catch (error) {
    next(error);
  }
};

// @desc    Get trip stats
// @route   GET /api/trips/stats
exports.getTripStats = async (req, res, next) => {
  try {
    const stats = await Trip.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalBudget: { $sum: '$budget.total' },
          totalSpent: { $sum: '$budget.spent' }
        }
      }
    ]);

    const totalTrips = await Trip.countDocuments({ user: req.user.id });
    const upcomingTrips = await Trip.countDocuments({ user: req.user.id, status: { $in: ['planning', 'upcoming'] } });

    res.status(200).json({
      success: true,
      stats: { totalTrips, upcomingTrips, byStatus: stats }
    });
  } catch (error) {
    next(error);
  }
};
