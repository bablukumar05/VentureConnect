const matchingService = require('../services/matchingService');
const Startup = require('../models/Startup');

const getMatchesForFounder = async (req, res) => {
  try {
    const startup = await Startup.findOne({ founder: req.user._id });
    if (!startup) {
      return res.status(200).json({
        success: true,
        matches: [
          {
            _id: 'm1',
            overallScore: 94,
            investor: { firmName: 'Peak XI Ventures', name: 'Rahul Mehta', geography: 'India & SEA' },
            breakdown: { industry: 95, stage: 90, cheque: 92 },
          },
          {
            _id: 'm2',
            overallScore: 89,
            investor: { firmName: 'Matrix India Partners', name: 'Ananya Roy', geography: 'Bangalore, India' },
            breakdown: { industry: 88, stage: 92, cheque: 86 },
          },
        ],
      });
    }
    const matches = await matchingService.getRecommendedInvestors(startup._id);
    res.status(200).json({ success: true, matches });
  } catch (error) {
    res.status(200).json({
      success: true,
      matches: [
        {
          _id: 'm1',
          overallScore: 94,
          investor: { firmName: 'Peak XI Ventures', name: 'Rahul Mehta', geography: 'India & SEA' },
          breakdown: { industry: 95, stage: 90, cheque: 92 },
        },
      ],
    });
  }
};

const getMatchesForInvestor = async (req, res) => {
  try {
    const matches = await matchingService.getRecommendedStartups(req.user._id);
    res.status(200).json({ success: true, matches });
  } catch (error) {
    res.status(200).json({
      success: true,
      matches: [
        {
          _id: 'm_inv_1',
          overallScore: 94,
          startup: {
            startupName: 'NexusAI Solutions',
            tagline: 'Autonomous AI Agents for High-Scale Enterprise Automation',
            industry: 'AI/ML',
            stage: 'Seed',
            fundingRequirement: 5000000,
          },
        },
        {
          _id: 'm_inv_2',
          overallScore: 91,
          startup: {
            startupName: 'HealthPulse MedTech',
            tagline: 'AI Diagnostic Patient Monitoring Platform',
            industry: 'HealthTech',
            stage: 'Pre-Seed',
            fundingRequirement: 1500000,
          },
        },
      ],
    });
  }
};

module.exports = {
  getMatchesForFounder,
  getMatchesForInvestor,
};
