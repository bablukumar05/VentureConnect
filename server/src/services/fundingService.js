const FundingRecord = require('../models/FundingRecord');
const Startup = require('../models/Startup');

const addFundingDeal = async (dealData) => {
  const deal = await FundingRecord.create({
    startup: dealData.startupId,
    investor: dealData.investorUserId,
    amount: dealData.amount,
    equityPercentage: dealData.equityPercentage || 2.5,
    dealType: dealData.dealType || 'Equity',
    status: dealData.status || 'verified',
    proofUrl: dealData.proofUrl || '',
    dealDate: dealData.dealDate || new Date(),
  });

  // Update total funding raised on startup
  const allDeals = await FundingRecord.find({ startup: dealData.startupId, status: 'verified' });
  const totalRaised = allDeals.reduce((sum, d) => sum + d.amount, 0);

  await Startup.findByIdAndUpdate(dealData.startupId, { fundingRaised: totalRaised });

  return deal;
};

const getFundingSummary = async (startupId) => {
  const startup = await Startup.findById(startupId);
  if (!startup) throw new Error('Startup not found');

  const deals = await FundingRecord.find({ startup: startupId, status: 'verified' }).populate(
    'investor',
    'name email avatar bio'
  );

  const totalGoal = startup.fundingRequirement || 5000000;
  const totalRaised = deals.reduce((sum, d) => sum + d.amount, 0);
  const percentage = Math.min(100, Math.round((totalRaised / totalGoal) * 100));
  const investorsCount = deals.length;
  const avgInvestment = investorsCount > 0 ? Math.round(totalRaised / investorsCount) : 0;
  const remaining = Math.max(0, totalGoal - totalRaised);

  return {
    totalGoal,
    totalRaised,
    percentage,
    investorsCount,
    avgInvestment,
    remaining,
    deals,
  };
};

const getAllFundingDeals = async () => {
  return await FundingRecord.find()
    .populate({
      path: 'startup',
      select: 'startupName logo fundingRequirement fundingRaised founder',
      populate: { path: 'founder', select: 'name email' },
    })
    .populate('investor', 'name email avatar')
    .sort({ createdAt: -1 });
};

module.exports = {
  addFundingDeal,
  getFundingSummary,
  getAllFundingDeals,
};
