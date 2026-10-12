const express = require('express');
const router = express.Router();
const {
  addFundingDeal,
  getFundingSummary,
  getAllFundingDeals,
  getCapTable,
  addShareholder,
  simulateDilution,
} = require('../controllers/fundingController');
const { protect } = require('../middleware/authMiddleware');

router.post('/deal', protect, addFundingDeal);
router.get('/summary/:startupId?', protect, getFundingSummary);
router.get('/all-deals', protect, getAllFundingDeals);

// Cap Table & Dilution Routes
router.get('/cap-table/:startupId?', protect, getCapTable);
router.post('/cap-table/shareholder', protect, addShareholder);
router.post('/cap-table/simulate', protect, simulateDilution);

module.exports = router;
