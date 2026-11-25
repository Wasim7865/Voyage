const express = require('express');
const {
  getPlaces,
  getPlacesByDestination,
  createPlace,
  updatePlace,
  deletePlace
} = require('../controllers/placeController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/destination/:destinationId', getPlacesByDestination);
router.get('/', getPlaces);
router.post('/', protect, authorize('admin'), createPlace);
router.put('/:id', protect, authorize('admin'), updatePlace);
router.delete('/:id', protect, authorize('admin'), deletePlace);

module.exports = router;