const pitchDeckService = require('../services/pitchDeckService');
const Startup = require('../models/Startup');
const { uploadToCloudinary } = require('../config/cloudinary');

const uploadPitchDeck = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'PDF file is required' });
    }

    const startup = await Startup.findOne({ founder: req.user._id });
    if (!startup) {
      return res.status(404).json({ success: false, message: 'Startup profile not found' });
    }

    // Upload using Cloudinary / local fallback
    const uploadResult = await uploadToCloudinary(req.file.path, 'pitch_decks');

    const fileData = {
      url: uploadResult.url,
      publicId: uploadResult.publicId,
      originalname: req.file.originalname,
      size: req.file.size,
    };

    const pitchDeck = await pitchDeckService.uploadPitchDeck(startup._id, fileData);

    res.status(200).json({ success: true, pitchDeck });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getPitchDeckByStartup = async (req, res) => {
  try {
    const pitchDeck = await pitchDeckService.getPitchDeckByStartup(req.params.startupId);
    res.status(200).json({ success: true, pitchDeck });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const recordDownload = async (req, res) => {
  try {
    const pitchDeck = await pitchDeckService.recordDownload(req.params.pitchDeckId);
    res.status(200).json({ success: true, pitchDeck });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  uploadPitchDeck,
  getPitchDeckByStartup,
  recordDownload,
};
