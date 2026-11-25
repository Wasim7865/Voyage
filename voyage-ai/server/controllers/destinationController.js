const Destination = require('../models/Destination');
const { enrichWithCurrency } = require('../data/currencies');

// @desc    Get all destinations
// @route   GET /api/destinations
exports.getDestinations = async (req, res, next) => {
  try {
    const { search, continent, climate, priceRange, tags, sort, page = 1, limit = 12 } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    if (continent) query.continent = continent;
    if (climate) query.climate = climate;
    if (priceRange) query.priceRange = priceRange;
    if (tags) query.tags = { $in: tags.split(',') };

    let sortOption = { featured: -1, rating: -1, _id: 1 };
    if (sort === 'rating') sortOption = { rating: -1, _id: 1 };
    if (sort === 'price-low') sortOption = { avgDailyBudget: 1, _id: 1 };
    if (sort === 'price-high') sortOption = { avgDailyBudget: -1, _id: 1 };
    if (sort === 'name') sortOption = { name: 1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Destination.countDocuments(query);
    const destinations = await Destination.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const enriched = destinations.map(d => enrichWithCurrency(d.toObject ? d.toObject() : { ...d }));

    res.status(200).json({
      success: true,
      count: enriched.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      destinations: enriched
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single destination
// @route   GET /api/destinations/:id
exports.getDestination = async (req, res, next) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }
    res.status(200).json({ success: true, destination: enrichWithCurrency(destination.toObject ? destination.toObject() : destination) });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured destinations
// @route   GET /api/destinations/featured
exports.getFeaturedDestinations = async (req, res, next) => {
  try {
    const destinations = await Destination.find({ featured: true }).sort({ featuredOrder: 1 }).limit(6);
    const enriched = destinations.map(d => enrichWithCurrency(d.toObject ? d.toObject() : { ...d }));
    res.status(200).json({ success: true, destinations: enriched });
  } catch (error) {
    next(error);
  }
};

// @desc    Get trending destinations
// @route   GET /api/destinations/trending
exports.getTrendingDestinations = async (req, res, next) => {
  try {
    const destinations = await Destination.find({ trending: true }).sort({ rating: -1 }).limit(6);
    const enriched = destinations.map(d => enrichWithCurrency(d.toObject ? d.toObject() : { ...d }));
    res.status(200).json({ success: true, destinations: enriched });
  } catch (error) {
    next(error);
  }
};

// @desc    Create destination
// @route   POST /api/destinations
exports.createDestination = async (req, res, next) => {
  try {
    const destination = await Destination.create(req.body);
    res.status(201).json({ success: true, destination });
  } catch (error) {
    next(error);
  }
};

// @desc    Update destination
// @route   PUT /api/destinations/:id
exports.updateDestination = async (req, res, next) => {
  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }
    res.status(200).json({ success: true, destination });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete destination
// @route   DELETE /api/destinations/:id
exports.deleteDestination = async (req, res, next) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }
    res.status(200).json({ success: true, message: 'Destination deleted' });
  } catch (error) {
    next(error);
  }
};
