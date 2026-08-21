const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema(
  {
    startup: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup', required: true, unique: true },
    profileViews: { type: Number, default: 0 },
    pitchDeckViews: { type: Number, default: 0 },
    pitchDeckDownloads: { type: Number, default: 0 },
    investorInterests: { type: Number, default: 0 },
    requestsCount: { type: Number, default: 0 },
    conversionRate: { type: Number, default: 12.4 }, // percentage
    dailyViews: [
      {
        date: { type: String }, // e.g. "Mon", "Tue"
        views: { type: Number, default: 0 },
        deckViews: { type: Number, default: 0 }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Analytics', analyticsSchema);
