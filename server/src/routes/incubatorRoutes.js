const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getIncubatorCohorts, createCohort } = require('../controllers/incubatorController');

router.get('/cohorts', protect, getIncubatorCohorts);
router.post('/cohorts', protect, createCohort);

module.exports = router;
