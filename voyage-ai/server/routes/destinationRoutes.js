const express = require('express');
const {
  getDestinations,
  getDestination,
  getFeaturedDestinations,
  getTrendingDestinations,
  createDestination,
  updateDestination,
  deleteDestination
} = require('../controllers/destinationController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/featured', getFeaturedDestinations);
router.get('/trending', getTrendingDestinations);
router.get('/search', getDestinations);
router.get('/', getDestinations);
router.get('/:id', getDestination);

router.post('/', protect, authorize('admin'), createDestination);
router.put('/:id', protect, authorize('admin'), updateDestination);
router.delete('/:id', protect, authorize('admin'), deleteDestination);

module.exports = router;