const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getUsers,
  updateUserStatus,
  verifyStartup,
  getAuditLogs,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.use(protect);
router.use(authorizeRoles('admin'));

router.get('/stats', getDashboardStats);
router.get('/users', getUsers);
router.put('/user-status', updateUserStatus);
router.put('/verify-startup', verifyStartup);
router.get('/audit-logs', getAuditLogs);

module.exports = router;
