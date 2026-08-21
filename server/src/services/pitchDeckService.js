const PitchDeck = require('../models/PitchDeck');
const Startup = require('../models/Startup');
const Analytics = require('../models/Analytics');

const uploadPitchDeck = async (startupId, fileData) => {
  const { url, publicId, originalname, size } = fileData;

  let pitchDeck = await PitchDeck.findOne({ startup: startupId });

  if (pitchDeck) {
    pitchDeck.fileUrl = url;
    pitchDeck.publicId = publicId || `deck_${Date.now()}`;
    pitchDeck.fileName = originalname;
    pitchDeck.fileSize = size || 2450000;
    pitchDeck.uploadedAt = new Date();
    await pitchDeck.save();
  } else {
    pitchDeck = await PitchDeck.create({
      startup: startupId,
      fileUrl: url,
      publicId: publicId || `deck_${Date.now()}`,
      fileName: originalname,
      fileSize: size || 2450000,
    });
  }

  // Link to startup profile
  await Startup.findByIdAndUpdate(startupId, { pitchDeck: pitchDeck._id });

  return pitchDeck;
};

const getPitchDeckByStartup = async (startupId) => {
  const deck = await PitchDeck.findOne({ startup: startupId });
  if (deck) {
    deck.viewsCount += 1;
    await deck.save();

    await Analytics.findOneAndUpdate(
      { startup: startupId },
      { $inc: { pitchDeckViews: 1 } },
      { upsert: true }
    );
  }
  return deck;
};

const recordDownload = async (pitchDeckId) => {
  const deck = await PitchDeck.findById(pitchDeckId);
  if (deck) {
    deck.downloadsCount += 1;
    await deck.save();

    await Analytics.findOneAndUpdate(
      { startup: deck.startup },
      { $inc: { pitchDeckDownloads: 1 } },
      { upsert: true }
    );
  }
  return deck;
};

module.exports = {
  uploadPitchDeck,
  getPitchDeckByStartup,
  recordDownload,
};
