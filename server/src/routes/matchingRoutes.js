const express = require('express');
const router = express.Router();
const { getMatchesForFounder, getMatchesForInvestor } = require('../controllers/matchingController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.get('/founder-recommendations', protect, authorizeRoles('founder'), getMatchesForFounder);
router.get('/investor-recommendations', protect, authorizeRoles('investor'), getMatchesForInvestor);

module.exports = router;
