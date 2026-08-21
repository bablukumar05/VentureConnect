const mongoose = require('mongoose');

const fundingRecordSchema = new mongoose.Schema(
  {
    startup: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup', required: true },
    investor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Investor's User ID
    amount: { type: Number, required: true }, // In INR e.g. 640000 (6.4L)
    equityPercentage: { type: Number, default: 2.5 },
    dealType: { type: String, enum: ['Equity', 'SAFE', 'Convertible Note', 'Debt'], default: 'Equity' },
    status: { type: String, enum: ['proposed', 'verified', 'completed'], default: 'verified' },
    proofUrl: { type: String, default: '' },
    dealDate: { type: Date, default: Date.now }
  },
  { timestamps: true, collection: 'fundingRounds' }
);

module.exports = mongoose.model('FundingRecord', fundingRecordSchema);
