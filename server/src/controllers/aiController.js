const path = require('path');
const fs = require('fs');
const Startup = require('../models/Startup');
const AIAnalysis = require('../models/AIAnalysis');
const PitchDeck = require('../models/PitchDeck');
const geminiAiService = require('../services/geminiAiService');

/**
 * Helper to find local PDF path for a startup's pitch deck.
 */
const findDeckLocalPath = async (startupId) => {
  const pitchDeck = await PitchDeck.findOne({ startup: startupId });
  if (!pitchDeck) return null;

  // Check if fileUrl points to a local uploads directory
  if (pitchDeck.fileUrl) {
    const filename = path.basename(pitchDeck.fileUrl);
    const localPath = path.join(__dirname, '../../uploads', filename);
    if (fs.existsSync(localPath)) {
      return { path: localPath, pitchDeck };
    }
  }

  // Also check uploads directory for any matching file
  const uploadsDir = path.join(__dirname, '../../uploads');
  if (fs.existsSync(uploadsDir)) {
    const files = fs.readdirSync(uploadsDir);
    const pdfFile = files.find((f) => f.endsWith('.pdf'));
    if (pdfFile) {
      return { path: path.join(uploadsDir, pdfFile), pitchDeck };
    }
  }

  return { path: null, pitchDeck };
};

/**
 * Get AI analysis for a startup
 */
const getStartupAIAnalysis = async (req, res) => {
  try {
    const startupId = req.params.startupId || req.query.startupId;
    let startup;

    if (startupId) {
      startup = await Startup.findById(startupId);
    } else {
      startup = await Startup.findOne({ founder: req.user._id });
    }

    if (!startup) {
      return res.status(404).json({ success: false, message: 'Startup profile not found' });
    }

    let analysis = await AIAnalysis.findOne({ startup: startup._id });

    if (!analysis) {
      // Find pitch deck if any
      const deckInfo = await findDeckLocalPath(startup._id);
      const aiResult = await geminiAiService.analyzePitchDeck(deckInfo?.path || '', startup);

      analysis = await AIAnalysis.create({
        startup: startup._id,
        pitchDeck: deckInfo?.pitchDeck?._id,
        ...aiResult,
      });
    }

    res.status(200).json({ success: true, analysis });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Re-run AI Startup Analysis (using real PDF text & Gemini)
 */
const runStartupAnalysis = async (req, res) => {
  try {
    const startup = await Startup.findOne({ founder: req.user._id });
    if (!startup) {
      return res.status(404).json({ success: false, message: 'Startup profile not found' });
    }

    const deckInfo = await findDeckLocalPath(startup._id);
    const aiResult = await geminiAiService.analyzePitchDeck(deckInfo?.path || '', startup);

    const updatedAnalysis = await AIAnalysis.findOneAndUpdate(
      { startup: startup._id },
      {
        startup: startup._id,
        pitchDeck: deckInfo?.pitchDeck?._id,
        ...aiResult,
      },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: 'AI Analysis re-generated successfully from pitch deck',
      analysis: updatedAnalysis,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Interactive Q&A: Ask questions about the startup's pitch deck
 */
const askPitchDeckQuestion = async (req, res) => {
  try {
    const { question, startupId } = req.body;
    if (!question) {
      return res.status(400).json({ success: false, message: 'Question string is required' });
    }

    let startup;
    if (startupId) {
      startup = await Startup.findById(startupId);
    } else {
      startup = await Startup.findOne({ founder: req.user._id });
    }

    if (!startup) {
      return res.status(404).json({ success: false, message: 'Startup profile not found' });
    }

    const deckInfo = await findDeckLocalPath(startup._id);
    const answer = await geminiAiService.askDeckQuestion(deckInfo?.path || '', question, startup);

    res.status(200).json({
      success: true,
      question,
      answer,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getStartupAIAnalysis,
  runStartupAnalysis,
  askPitchDeckQuestion,
};
