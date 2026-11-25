const express = require('express');
const {
  getConversations,
  getConversation,
  chat,
  planTrip,
  optimizeItinerary,
  budgetPlan,
  packingList
} = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/conversations', getConversations);
router.get('/conversations/:id', getConversation);
router.post('/chat', chat);
router.post('/plan-trip', planTrip);
router.post('/optimize-itinerary', optimizeItinerary);
router.post('/budget-plan', budgetPlan);
router.post('/packing-list', packingList);

module.exports = router;