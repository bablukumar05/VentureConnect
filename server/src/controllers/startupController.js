const startupService = require('../services/startupService');

const createOrUpdateStartup = async (req, res) => {
  try {
    const startup = await startupService.createOrUpdateStartup(req.user._id, req.body);
    res.status(200).json({ success: true, startup });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getMyStartup = async (req, res) => {
  try {
    const startup = await startupService.getStartupByFounder(req.user._id);
    res.status(200).json({ success: true, startup });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getStartupById = async (req, res) => {
  try {
    const startup = await startupService.getStartupById(req.params.id);
    if (!startup) return res.status(404).json({ success: false, message: 'Startup not found' });
    res.status(200).json({ success: true, startup });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllStartups = async (req, res) => {
  try {
    const startups = await startupService.getAllStartups(req.query);
    res.status(200).json({ success: true, startups });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrUpdateStartup,
  getMyStartup,
  getStartupById,
  getAllStartups,
};
