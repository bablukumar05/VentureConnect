const express = require('express');
const router = express.Router();
const {
  getMyInvestorProfile,
  updateInvestorProfile,
  getAllInvestors,
  toggleSaveStartup,
  getSavedStartups,
} = require('../controllers/investorController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.get('/all', getAllInvestors);
router.get('/my-profile', protect, authorizeRoles('investor'), getMyInvestorProfile);
router.put('/my-profile', protect, authorizeRoles('investor'), updateInvestorProfile);
router.post('/save-startup/:startupId', protect, authorizeRoles('investor'), toggleSaveStartup);
router.get('/saved-startups', protect, authorizeRoles('investor'), getSavedStartups);

module.exports = router;
