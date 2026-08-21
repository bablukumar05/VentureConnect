const investorService = require('../services/investorService');

const getMyInvestorProfile = async (req, res) => {
  try {
    const investor = await investorService.getInvestorByUserId(req.user._id);
    res.status(200).json({ success: true, investor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateInvestorProfile = async (req, res) => {
  try {
    const investor = await investorService.updateInvestorProfile(req.user._id, req.body);
    res.status(200).json({ success: true, investor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllInvestors = async (req, res) => {
  try {
    const investors = await investorService.getAllInvestors(req.query);
    res.status(200).json({ success: true, investors });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const toggleSaveStartup = async (req, res) => {
  try {
    const result = await investorService.saveStartupForInvestor(req.user._id, req.params.startupId);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getSavedStartups = async (req, res) => {
  try {
    const saved = await investorService.getSavedStartups(req.user._id);
    res.status(200).json({ success: true, startups: saved });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getMyInvestorProfile,
  updateInvestorProfile,
  getAllInvestors,
  toggleSaveStartup,
  getSavedStartups,
};
