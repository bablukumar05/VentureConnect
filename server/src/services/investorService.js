const Investor = require('../models/Investor');
const SavedStartup = require('../models/SavedStartup');

const getInvestorByUserId = async (userId) => {
  let investor = await Investor.findOne({ user: userId }).populate('user', 'name email avatar bio location linkedin');
  if (!investor) {
    investor = await Investor.create({ user: userId });
    investor = await investor.populate('user', 'name email avatar bio location linkedin');
  }
  return investor;
};

const updateInvestorProfile = async (userId, profileData) => {
  const investor = await Investor.findOneAndUpdate(
    { user: userId },
    { $set: profileData },
    { new: true, upsert: true }
  ).populate('user', 'name email avatar bio location');
  return investor;
};

const getAllInvestors = async (filters = {}) => {
  const query = { status: 'verified' };
  if (filters.industry) {
    query.industries = { $in: [new RegExp(filters.industry, 'i')] };
  }
  if (filters.stage) {
    query.preferredStages = { $in: [filters.stage] };
  }
  return await Investor.find(query).populate('user', 'name email avatar bio location linkedin').sort({ createdAt: -1 });
};

const saveStartupForInvestor = async (investorUserId, startupId) => {
  const existing = await SavedStartup.findOne({ investor: investorUserId, startup: startupId });
  if (existing) {
    await SavedStartup.findByIdAndDelete(existing._id);
    return { isSaved: false };
  } else {
    await SavedStartup.create({ investor: investorUserId, startup: startupId });
    return { isSaved: true };
  }
};

const getSavedStartups = async (investorUserId) => {
  const saved = await SavedStartup.find({ investor: investorUserId }).populate({
    path: 'startup',
    populate: { path: 'founder pitchDeck' },
  });
  return saved.map((s) => s.startup);
};

module.exports = {
  getInvestorByUserId,
  updateInvestorProfile,
  getAllInvestors,
  saveStartupForInvestor,
  getSavedStartups,
};
