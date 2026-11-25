const express = require('express');
const {
  getTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
  updateItinerary,
  updateBudget,
  getTripStats
} = require('../controllers/tripController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/stats', getTripStats);
router.get('/', getTrips);
router.get('/:id', getTrip);
router.post('/', createTrip);
router.put('/:id', updateTrip);
router.put('/:id/itinerary', updateItinerary);
router.put('/:id/budget', updateBudget);
router.delete('/:id', deleteTrip);

module.exports = router;