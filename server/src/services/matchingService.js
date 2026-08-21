const InvestorMatch = require('../models/InvestorMatch');
const Startup = require('../models/Startup');
const Investor = require('../models/Investor');

/**
 * Calculates match score between a single Startup and single Investor profile.
 * Total = 100%
 * Industry Match     = 30%
 * Funding Match      = 25%
 * Location Match     = 15%
 * Stage Match        = 20%
 * Risk Profile Match = 10%
 */
const calculateMatchScore = (startup, investor) => {
  let industryScore = 0;
  let fundingScore = 0;
  let locationScore = 0;
  let stageScore = 0;
  let riskScore = 0;

  // 1. Industry Match (30%)
  if (investor.industries && investor.industries.length > 0) {
    const isExactMatch = investor.industries.some(
      (ind) => ind.toLowerCase() === startup.industry.toLowerCase()
    );
    if (isExactMatch) {
      industryScore = 30;
    } else {
      const hasOverlap = investor.industries.some(
        (ind) => startup.industry.toLowerCase().includes(ind.toLowerCase()) || ind.toLowerCase().includes(startup.industry.toLowerCase())
      );
      industryScore = hasOverlap ? 20 : 5;
    }
  } else {
    industryScore = 15;
  }

  // 2. Funding Match (25%)
  const fundingReq = startup.fundingRequirement || 5000000;
  const minBudget = investor.investmentRange?.min || 500000;
  const maxBudget = investor.investmentRange?.max || 10000000;

  if (fundingReq >= minBudget && fundingReq <= maxBudget) {
    fundingScore = 25;
  } else if (fundingReq < minBudget && fundingReq >= minBudget * 0.5) {
    fundingScore = 18;
  } else if (fundingReq > maxBudget && fundingReq <= maxBudget * 1.5) {
    fundingScore = 15;
  } else {
    fundingScore = 5;
  }

  // 3. Location Match (15%)
  if (investor.geography && startup.location) {
    const invGeo = investor.geography.toLowerCase();
    const stLocation = startup.location.toLowerCase();
    if (stLocation.includes(invGeo) || invGeo === 'global' || invGeo === 'india' || invGeo.includes('pan india')) {
      locationScore = 15;
    } else {
      locationScore = 8;
    }
  } else {
    locationScore = 10;
  }

  // 4. Stage Match (20%)
  if (investor.preferredStages && investor.preferredStages.length > 0) {
    const isStageMatch = investor.preferredStages.some(
      (stg) => stg.toLowerCase() === startup.stage.toLowerCase()
    );
    stageScore = isStageMatch ? 20 : 6;
  } else {
    stageScore = 12;
  }

  // 5. Risk Profile Match (10%)
  const stRisk = startup.riskProfile || 'Medium';
  const invRisk = investor.riskTolerance || 'Medium';

  if (stRisk === invRisk) {
    riskScore = 10;
  } else if (
    (stRisk === 'Low' && invRisk === 'Medium') ||
    (stRisk === 'Medium' && invRisk === 'High') ||
    (stRisk === 'Medium' && invRisk === 'Low')
  ) {
    riskScore = 7;
  } else {
    riskScore = 4;
  }

  const overallScore = Math.min(
    100,
    Math.round(industryScore + fundingScore + locationScore + stageScore + riskScore)
  );

  return {
    overallScore,
    breakdown: {
      industryMatch: industryScore,  // max 30
      fundingMatch: fundingScore,    // max 25
      locationMatch: locationScore,  // max 15
      stageMatch: stageScore,        // max 20
      riskProfileMatch: riskScore,   // max 10
    },
  };
};

/**
 * Recalculate matches for a given startup against all verified investors.
 */
const recalculateStartupMatches = async (startupId) => {
  const startup = await Startup.findById(startupId);
  if (!startup) return [];

  const investors = await Investor.find({ status: 'verified' }).populate('user');
  const matches = [];

  for (const investor of investors) {
    const scoreData = calculateMatchScore(startup, investor);
    const matchRecord = await InvestorMatch.findOneAndUpdate(
      { startup: startup._id, investor: investor._id },
      {
        startup: startup._id,
        investor: investor._id,
        overallScore: scoreData.overallScore,
        breakdown: scoreData.breakdown,
        calculatedAt: new Date(),
      },
      { upsert: true, new: true }
    ).populate({
      path: 'investor',
      populate: { path: 'user', select: 'name email avatar bio location linkedin' },
    });
    matches.push(matchRecord);
  }

  return matches.sort((a, b) => b.overallScore - a.overallScore);
};

/**
 * Get top recommended investors for a founder's startup
 */
const getRecommendedInvestors = async (startupId) => {
  let matches = await InvestorMatch.find({ startup: startupId })
    .populate({
      path: 'investor',
      populate: { path: 'user', select: 'name email avatar bio location linkedin' },
    })
    .sort({ overallScore: -1 });

  if (!matches || matches.length === 0) {
    matches = await recalculateStartupMatches(startupId);
  }

  return matches;
};

/**
 * Get top recommended startups for an investor
 */
const getRecommendedStartups = async (investorUserId) => {
  const investor = await Investor.findOne({ user: investorUserId });
  if (!investor) return [];

  const matches = await InvestorMatch.find({ investor: investor._id })
    .populate({
      path: 'startup',
      populate: { path: 'founder', select: 'name email avatar' },
    })
    .sort({ overallScore: -1 });

  return matches;
};

module.exports = {
  calculateMatchScore,
  recalculateStartupMatches,
  getRecommendedInvestors,
  getRecommendedStartups,
};
