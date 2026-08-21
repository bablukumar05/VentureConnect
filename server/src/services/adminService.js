const User = require('../models/User');
const Startup = require('../models/Startup');
const Investor = require('../models/Investor');
const Mentor = require('../models/Mentor');
const FundingRecord = require('../models/FundingRecord');
const AuditLog = require('../models/AuditLog');

const getAdminDashboardStats = async () => {
  const totalUsers = await User.countDocuments();
  const totalStartups = await Startup.countDocuments();
  const pendingStartups = await Startup.countDocuments({ status: 'pending' });
  const verifiedStartups = await Startup.countDocuments({ status: 'verified' });
  const totalInvestors = await Investor.countDocuments();
  const totalMentors = await Mentor.countDocuments();

  const fundingDeals = await FundingRecord.find({ status: 'verified' });
  const totalFundingTracked = fundingDeals.reduce((sum, d) => sum + d.amount, 0);

  const auditLogs = await AuditLog.find()
    .populate('admin', 'name email')
    .sort({ createdAt: -1 })
    .limit(10);

  return {
    totalUsers,
    totalStartups,
    pendingStartups,
    verifiedStartups,
    totalInvestors,
    totalMentors,
    totalFundingTracked,
    auditLogs,
  };
};

const updateUserStatus = async (adminId, userId, isActive) => {
  const user = await User.findByIdAndUpdate(userId, { isActive }, { new: true });
  await AuditLog.create({
    admin: adminId,
    action: isActive ? 'UNBLOCK_USER' : 'BLOCK_USER',
    targetResource: 'User',
    resourceId: userId.toString(),
    details: `User ${user.email} status updated to active=${isActive}`,
  });
  return user;
};

const updateStartupVerification = async (adminId, startupId, status) => {
  const startup = await Startup.findByIdAndUpdate(startupId, { status }, { new: true });
  await AuditLog.create({
    admin: adminId,
    action: status === 'verified' ? 'VERIFY_STARTUP' : 'REJECT_STARTUP',
    targetResource: 'Startup',
    resourceId: startupId.toString(),
    details: `Startup ${startup.startupName} verification set to ${status}`,
  });
  return startup;
};

const getAuditLogs = async () => {
  return await AuditLog.find().populate('admin', 'name email').sort({ createdAt: -1 });
};

module.exports = {
  getAdminDashboardStats,
  updateUserStatus,
  updateStartupVerification,
  getAuditLogs,
};
