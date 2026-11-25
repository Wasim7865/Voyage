const Place = require('../models/Place');

// @desc    Get all places with filters
// @route   GET /api/places
exports.getPlaces = async (req, res, next) => {
  try {
    const { destination, category, search, limit = 20 } = req.query;

    let query = {};
    if (destination) query.destination = destination;
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const places = await Place.find(query)
      .sort({ rating: -1 })
      .limit(parseInt(limit));

    res.status(200).json({ success: true, count: places.length, places });
  } catch (error) {
    next(error);
  }
};

// @desc    Get places by destination
// @route   GET /api/places/destination/:destinationId
exports.getPlacesByDestination = async (req, res, next) => {
  try {
    const places = await Place.find({ destination: req.params.destinationId })
      .sort({ rating: -1 });
    res.status(200).json({ success: true, count: places.length, places });
  } catch (error) {
    next(error);
  }
};

// @desc    Create place (admin)
// @route   POST /api/places
exports.createPlace = async (req, res, next) => {
  try {
    const place = await Place.create(req.body);
    res.status(201).json({ success: true, place });
  } catch (error) {
    next(error);
  }
};

// @desc    Update place (admin)
// @route   PUT /api/places/:id
exports.updatePlace = async (req, res, next) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!place) {
      return res.status(404).json({ success: false, message: 'Place not found' });
    }
    res.status(200).json({ success: true, place });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete place (admin)
// @route   DELETE /api/places/:id
exports.deletePlace = async (req, res, next) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) {
      return res.status(404).json({ success: false, message: 'Place not found' });
    }
    res.status(200).json({ success: true, message: 'Place deleted' });
  } catch (error) {
    next(error);
  }
};