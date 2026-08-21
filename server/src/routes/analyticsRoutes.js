const express = require('express');
const router = express.Router();
const { getStartupAnalytics } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:startupId?', protect, getStartupAnalytics);

module.exports = router;
