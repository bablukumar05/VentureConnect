const fundingService = require('../services/fundingService');
const capTableService = require('../services/capTableService');
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

// Cap Table Endpoints
const getCapTable = async (req, res) => {
  try {
    let startupId = req.params.startupId;

    if (!startupId) {
      const startup = await Startup.findOne({ founder: req.user._id });
      if (startup) startupId = startup._id;
      else {
        const anyStartup = await Startup.findOne();
        if (anyStartup) startupId = anyStartup._id;
      }
    }

    if (!startupId) {
      return res.status(404).json({ success: false, message: 'Startup profile not found' });
    }

    const capTable = await capTableService.getCapTable(startupId);
    res.status(200).json({ success: true, capTable });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addShareholder = async (req, res) => {
  try {
    let { startupId, name, shareType, sharesCount, investmentAmount } = req.body;

    if (!startupId) {
      const startup = await Startup.findOne({ founder: req.user._id });
      if (startup) startupId = startup._id;
    }

    if (!startupId || !name) {
      return res.status(400).json({ success: false, message: 'Startup ID and Shareholder Name required' });
    }

    const capTable = await capTableService.addShareholder(startupId, {
      name,
      shareType,
      sharesCount,
      investmentAmount,
    });

    res.status(200).json({ success: true, capTable, message: 'Share grant added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const simulateDilution = async (req, res) => {
  try {
    let { startupId, preMoneyValuation, newInvestment, esopExpansionPercent, safeDiscount, safeCap } = req.body;

    if (!startupId) {
      const startup = await Startup.findOne({ founder: req.user._id });
      if (startup) startupId = startup._id;
      else {
        const anyStartup = await Startup.findOne();
        if (anyStartup) startupId = anyStartup._id;
      }
    }

    const simulation = await capTableService.simulateDilution(startupId, {
      preMoneyValuation,
      newInvestment,
      esopExpansionPercent,
      safeDiscount,
      safeCap,
    });

    res.status(200).json({ success: true, simulation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addFundingDeal,
  getFundingSummary,
  getAllFundingDeals,
  getCapTable,
  addShareholder,
  simulateDilution,
};
