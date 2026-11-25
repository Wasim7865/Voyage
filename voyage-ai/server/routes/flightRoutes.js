const express = require('express');
const { searchFlights, getDeals } = require('../controllers/flightController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/search', searchFlights);
router.get('/deals', getDeals);

module.exports = router;