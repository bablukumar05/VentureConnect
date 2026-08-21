const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createCheckoutOrder, getSubscriptionStatus } = require('../controllers/paymentController');

router.post('/checkout', protect, createCheckoutOrder);
router.get('/subscription', protect, getSubscriptionStatus);

module.exports = router;
