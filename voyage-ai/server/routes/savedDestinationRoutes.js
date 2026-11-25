const express = require('express');
const {
  getSavedDestinations,
  saveDestination,
  updateSavedDestination,
  removeSavedDestination
} = require('../controllers/savedDestinationController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', getSavedDestinations);
router.post('/', saveDestination);
router.put('/:id', updateSavedDestination);
router.delete('/:id', removeSavedDestination);

module.exports = router;