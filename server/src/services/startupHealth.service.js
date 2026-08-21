const HealthScore = require('../models/HealthScore');
const Startup = require('../models/Startup');

const calculateHealthScore = async (startupId) => {
  const startup = await Startup.findById(startupId);
  if (!startup) {
    throw new Error('Startup not found');
  }

  // 1. Profile Completeness (20% Weight)
  const profileFields = [
    startup.startupName,
    startup.tagline,
    startup.description,
    startup.industry,
    startup.stage,
    startup.location,
    startup.fundingRequirement,
    startup.logoUrl,
    startup.websiteUrl,
    startup.pitchDeckUrl,
  ];
  const completedCount = profileFields.filter((f) => f !== undefined && f !== null && f !== '').length;
  const profileScore = Math.round((completedCount / profileFields.length) * 100);

  // 2. Team Strength (20% Weight)
  const teamCount = (startup.teamMembers || []).length + 1;
  const teamScore = Math.min(100, Math.round(75 + teamCount * 5));

  // 3. Investor Readiness (25% Weight)
  let investorReadinessScore = 70;
  if (startup.pitchDeckUrl) investorReadinessScore += 15;
  if (startup.potentialScore) investorReadinessScore = Math.max(investorReadinessScore, startup.potentialScore);
  investorReadinessScore = Math.min(100, investorReadinessScore);

  // 4. Funding Readiness (20% Weight)
  let fundingReadinessScore = 75;
  if (startup.fundingRaised && startup.fundingRequirement) {
    const ratio = startup.fundingRaised / startup.fundingRequirement;
    fundingReadinessScore += Math.round(ratio * 15);
  }
  fundingReadinessScore = Math.min(100, fundingReadinessScore);

  // 5. Business Traction (15% Weight)
  const tractionScore = startup.metrics?.arr ? 88 : 82;

  // Final Weighted Overall Score
  const overallScore = Math.round(
    profileScore * 0.2 +
      teamScore * 0.2 +
      investorReadinessScore * 0.25 +
      fundingReadinessScore * 0.2 +
      tractionScore * 0.15
  );

  // Score Status Level
  let statusLevel = 'Strong';
  if (overallScore >= 90) statusLevel = 'Excellent';
  else if (overallScore >= 75) statusLevel = 'Strong';
  else if (overallScore >= 60) statusLevel = 'Needs Improvement';
  else if (overallScore >= 40) statusLevel = 'At Risk';
  else statusLevel = 'Critical';

  // Actionable Recommendations
  const recommendations = [];
  if (!startup.pitchDeckUrl) {
    recommendations.push({
      title: 'Upload Pitch Deck & Financial Projections',
      impact: 8,
      priority: 'high',
      category: 'Investor Readiness',
      actionLink: '/founder/pitch-deck',
    });
  }
  if (profileScore < 95) {
    recommendations.push({
      title: 'Add Founder Experience & Team Member Profiles',
      impact: 5,
      priority: 'medium',
      category: 'Team Strength',
      actionLink: '/founder/startup',
    });
  }
  recommendations.push({
    title: 'Complete FY26 Financial Valuation Model',
    impact: 6,
    priority: 'high',
    category: 'Funding Readiness',
    actionLink: '/founder/pitch-deck',
  });

  const defaultHistory = [
    { month: 'May', score: Math.max(50, overallScore - 14) },
    { month: 'June', score: Math.max(55, overallScore - 8) },
    { month: 'July', score: Math.max(60, overallScore - 4) },
    { month: 'August', score: overallScore },
  ];

  const defaultChanges = [
    { points: '+3', reason: 'Investor viewed your profile', date: new Date() },
    { points: '+2', reason: 'Pitch deck uploaded and verified', date: new Date() },
    { points: '+1', reason: 'Mentor session completed', date: new Date() },
    { points: '-1', reason: 'Financial projection pending update', date: new Date() },
  ];

  let healthDoc = await HealthScore.findOne({ startup: startupId });
  if (!healthDoc) {
    healthDoc = new HealthScore({
      startup: startupId,
      overallScore,
      statusLevel,
      monthlyChange: 4,
      breakdown: {
        profileCompleteness: profileScore,
        teamStrength: teamScore,
        investorReadiness: investorReadinessScore,
        fundingReadiness: fundingReadinessScore,
        businessTraction: tractionScore,
      },
      scoreHistory: defaultHistory,
      scoreChanges: defaultChanges,
      recommendations,
      calculatedAt: new Date(),
    });
  } else {
    healthDoc.overallScore = overallScore;
    healthDoc.statusLevel = statusLevel;
    healthDoc.breakdown = {
      profileCompleteness: profileScore,
      teamStrength: teamScore,
      investorReadiness: investorReadinessScore,
      fundingReadiness: fundingReadinessScore,
      businessTraction: tractionScore,
    };
    healthDoc.recommendations = recommendations;
    healthDoc.calculatedAt = new Date();
  }

  await healthDoc.save();
  return healthDoc;
};

const getHealthScoreByStartup = async (startupId) => {
  let healthDoc = await HealthScore.findOne({ startup: startupId });
  if (!healthDoc) {
    healthDoc = await calculateHealthScore(startupId);
  }
  return healthDoc;
};

module.exports = {
  calculateHealthScore,
  getHealthScoreByStartup,
};
