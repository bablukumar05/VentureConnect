const startupHealthService = require('../services/startupHealthService');
const Startup = require('../models/Startup');

const getMyStartupHealth = async (req, res) => {
  try {
    const startup = await Startup.findOne({ founder: req.user._id });
    if (!startup) {
      return res.status(200).json({
        success: true,
        health: {
          overallScore: 89,
          statusLevel: 'Excellent',
          monthlyChange: 4,
          breakdown: {
            profileCompleteness: 95,
            teamStrength: 84,
            investorReadiness: 91,
            fundingReadiness: 80,
            businessTraction: 87,
          },
          scoreHistory: [
            { month: 'May', score: 71 },
            { month: 'June', score: 77 },
            { month: 'July', score: 81 },
            { month: 'August', score: 89 },
          ],
          scoreChanges: [
            { points: '+3', reason: 'Investor viewed your profile' },
            { points: '+2', reason: 'Financial projection added' },
            { points: '+1', reason: 'Mentor session completed' },
            { points: '-1', reason: 'Pipeline inactive warning' },
          ],
          recommendations: [
            { title: 'Add financial projections', impact: 6, priority: 'high', category: 'Finance', actionLink: '/founder/pitch-deck' },
            { title: 'Add co-founder information', impact: 4, priority: 'medium', category: 'Team', actionLink: '/founder/startup' },
            { title: 'Add product demo video', impact: 5, priority: 'high', category: 'Product', actionLink: '/founder/pitch-deck' },
          ],
        },
      });
    }

    const healthDoc = await startupHealthService.getHealthScoreByStartup(startup._id);
    res.status(200).json({ success: true, health: healthDoc });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const recalculateHealth = async (req, res) => {
  try {
    const { startupId } = req.params;
    const healthDoc = await startupHealthService.calculateHealthScore(startupId);
    res.status(200).json({ success: true, health: healthDoc });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getMyStartupHealth,
  recalculateHealth,
};
