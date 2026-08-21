const fundingService = require('../services/fundingService');
const Startup = require('../models/Startup');

const addFundingDeal = async (req, res) => {
  try {
    const { startupId, amount, equityPercentage, dealType, proofUrl } = req.body;
    const deal = await fundingService.addFundingDeal({
      startupId,
      investorUserId: req.user._id,
      amount,
      equityPercentage,
      dealType,
      proofUrl,
    });
    res.status(201).json({ success: true, deal });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getFundingSummary = async (req, res) => {
  try {
    let startupId = req.params.startupId;

    if (!startupId && req.user.role === 'founder') {
      const startup = await Startup.findOne({ founder: req.user._id });
      if (startup) startupId = startup._id;
    }

    if (!startupId) {
      return res.status(400).json({ success: false, message: 'Startup ID is required' });
    }

    const summary = await fundingService.getFundingSummary(startupId);
    res.status(200).json({ success: true, summary });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllFundingDeals = async (req, res) => {
  try {
    const deals = await fundingService.getAllFundingDeals();
    res.status(200).json({ success: true, deals });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  addFundingDeal,
  getFundingSummary,
  getAllFundingDeals,
};
