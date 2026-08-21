const mongoose = require('mongoose');

const investorMatchSchema = new mongoose.Schema(
  {
    startup: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup', required: true },
    investor: { type: mongoose.Schema.Types.ObjectId, ref: 'Investor', required: true },
    overallScore: { type: Number, required: true }, // e.g. 92%
    breakdown: {
      industryMatch: { type: Number, default: 30 },      // max 30%
      stageMatch: { type: Number, default: 20 },         // max 20%
      budgetMatch: { type: Number, default: 20 },        // max 20%
      locationMatch: { type: Number, default: 10 },      // max 10%
      investmentTypeMatch: { type: Number, default: 10 },// max 10%
      potentialMatch: { type: Number, default: 10 },     // max 10%
    },
    calculatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

investorMatchSchema.index({ startup: 1, investor: 1 }, { unique: true });

module.exports = mongoose.model('InvestorMatch', investorMatchSchema);
