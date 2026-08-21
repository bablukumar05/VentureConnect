const express = require('express');
const router = express.Router();
const startupHealthController = require('../controllers/startupHealthController');
const { protect } = require('../middleware/authMiddleware');

router.get('/my-health', protect, startupHealthController.getMyStartupHealth);
router.post('/:startupId/recalculate', protect, startupHealthController.recalculateHealth);

module.exports = router;
