const adminService = require('../services/adminService');
const User = require('../models/User');
const Startup = require('../models/Startup');
const Investor = require('../models/Investor');
const Mentor = require('../models/Mentor');

const getDashboardStats = async (req, res) => {
  try {
    const stats = await adminService.getAdminDashboardStats();
    res.status(200).json({ success: true, stats });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { userId, isActive } = req.body;
    const user = await adminService.updateUserStatus(req.user._id, userId, isActive);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const verifyStartup = async (req, res) => {
  try {
    const { startupId, status } = req.body;
    const startup = await adminService.updateStartupVerification(req.user._id, startupId, status);
    res.status(200).json({ success: true, startup });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAuditLogs = async (req, res) => {
  try {
    const logs = await adminService.getAuditLogs();
    res.status(200).json({ success: true, logs });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getUsers,
  updateUserStatus,
  verifyStartup,
  getAuditLogs,
};
