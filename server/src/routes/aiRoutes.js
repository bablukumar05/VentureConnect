const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getStartupAIAnalysis, runStartupAnalysis } = require('../controllers/aiController');

router.get('/analysis', protect, getStartupAIAnalysis);
router.get('/analysis/:startupId', protect, getStartupAIAnalysis);
router.post('/analyze', protect, runStartupAnalysis);

module.exports = router;
