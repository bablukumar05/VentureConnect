const mongoose = require('mongoose');

const pitchDeckSchema = new mongoose.Schema(
  {
    startup: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup', required: true },
    fileUrl: { type: String, required: true },
    publicId: { type: String, default: '' },
    fileName: { type: String, required: true },
    fileSize: { type: Number, default: 2450000 }, // Bytes
    uploadedAt: { type: Date, default: Date.now },
    viewsCount: { type: Number, default: 0 },
    downloadsCount: { type: Number, default: 0 },
  },
  { timestamps: true, collection: 'pitchDecks' }
);

module.exports = mongoose.model('PitchDeck', pitchDeckSchema);
