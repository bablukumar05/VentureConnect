const express = require('express');
const router = express.Router();
const {
  createOrUpdateStartup,
  getMyStartup,
  getStartupById,
  getAllStartups,
} = require('../controllers/startupController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.get('/all', getAllStartups);
router.get('/my-startup', protect, authorizeRoles('founder'), getMyStartup);
router.post('/profile', protect, authorizeRoles('founder'), createOrUpdateStartup);
router.get('/:id', getStartupById);

module.exports = router;
