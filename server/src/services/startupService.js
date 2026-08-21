const Startup = require('../models/Startup');
const Analytics = require('../models/Analytics');
const { recalculateStartupMatches } = require('./matchingService');

const createOrUpdateStartup = async (founderId, startupData) => {
  let startup = await Startup.findOne({ founder: founderId });

  if (startup) {
    Object.assign(startup, startupData);
    await startup.save();
  } else {
    startup = await Startup.create({
      founder: founderId,
      ...startupData,
    });
    // Create initial analytics record
    await Analytics.create({
      startup: startup._id,
      dailyViews: [
        { date: 'Mon', views: 42, deckViews: 12 },
        { date: 'Tue', views: 58, deckViews: 19 },
        { date: 'Wed', views: 86, deckViews: 29 },
        { date: 'Thu', views: 71, deckViews: 24 },
        { date: 'Fri', views: 95, deckViews: 38 },
        { date: 'Sat', views: 64, deckViews: 21 },
        { date: 'Sun', views: 80, deckViews: 31 },
      ],
    });
  }

  // Trigger matching engine calculation asynchronously
  recalculateStartupMatches(startup._id).catch((err) => console.error('Match recalc error:', err));

  return startup;
};

const getStartupByFounder = async (founderId) => {
  return await Startup.findOne({ founder: founderId })
    .populate('founder', 'name email avatar bio location')
    .populate('pitchDeck');
};

const getStartupById = async (startupId) => {
  const startup = await Startup.findById(startupId)
    .populate('founder', 'name email avatar bio location linkedin')
    .populate('pitchDeck');

  if (startup) {
    // Increment view count in analytics
    await Analytics.findOneAndUpdate(
      { startup: startupId },
      { $inc: { profileViews: 1 } },
      { upsert: true }
    );
  }

  return startup;
};

const getAllStartups = async (filters = {}) => {
  const query = { status: 'verified' };

  if (filters.industry) {
    query.industry = { $regex: filters.industry, $options: 'i' };
  }
  if (filters.stage) {
    query.stage = filters.stage;
  }
  if (filters.search) {
    query.$or = [
      { startupName: { $regex: filters.search, $options: 'i' } },
      { tagline: { $regex: filters.search, $options: 'i' } },
      { description: { $regex: filters.search, $options: 'i' } },
    ];
  }

  return await Startup.find(query)
    .populate('founder', 'name email avatar bio')
    .populate('pitchDeck')
    .sort({ createdAt: -1 });
};

module.exports = {
  createOrUpdateStartup,
  getStartupByFounder,
  getStartupById,
  getAllStartups,
};
