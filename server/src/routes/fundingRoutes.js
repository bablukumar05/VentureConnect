const express = require('express');
const router = express.Router();
const { addFundingDeal, getFundingSummary, getAllFundingDeals } = require('../controllers/fundingController');
const { protect } = require('../middleware/authMiddleware');

router.post('/deal', protect, addFundingDeal);
router.get('/summary/:startupId?', protect, getFundingSummary);
router.get('/all-deals', protect, getAllFundingDeals);

module.exports = router;
