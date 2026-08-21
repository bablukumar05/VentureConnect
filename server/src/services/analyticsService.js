const Analytics = require('../models/Analytics');
const Startup = require('../models/Startup');
const InvestmentRequest = require('../models/InvestmentRequest');

const getStartupAnalytics = async (startupId) => {
  let analytics = await Analytics.findOne({ startup: startupId });

  if (!analytics) {
    analytics = await Analytics.create({
      startup: startupId,
      profileViews: 412,
      pitchDeckViews: 145,
      pitchDeckDownloads: 62,
      investorInterests: 18,
      requestsCount: 9,
      conversionRate: 14.8,
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

  const requests = await InvestmentRequest.countDocuments({ startup: startupId });
  analytics.requestsCount = requests || analytics.requestsCount;

  return analytics;
};

module.exports = {
  getStartupAnalytics,
};
