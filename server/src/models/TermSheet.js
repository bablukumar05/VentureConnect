const mongoose = require('mongoose');

const termSheetSchema = new mongoose.Schema(
  {
    startup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Startup',
      required: true,
      index: true,
    },
    founder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    investor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    roundName: {
      type: String,
      enum: ['Pre-Seed', 'Seed', 'Series A', 'Series B', 'SAFE Note', 'Convertible Note'],
      default: 'Seed',
    },
    investmentAmount: {
      type: Number,
      required: true,
    },
    preMoneyValuation: {
      type: Number,
      required: true,
    },
    postMoneyValuation: {
      type: Number,
      required: true,
    },
    equityPercentage: {
      type: Number,
      required: true,
    },
    liquidationPreference: {
      type: String,
      default: '1x Non-Participating Preference',
    },
    boardSeats: {
      type: String,
      default: '1 Founder, 1 Lead Investor, 1 Independent Observer',
    },
    protectiveProvisions: {
      type: [String],
      default: [
        'Veto rights on subsequent down-round issuances',
        'Approval required for any M&A or asset sale > $500,000',
        'Information rights including quarterly audited financials',
        'Pro-rata rights in subsequent financing rounds',
      ],
    },
    status: {
      type: String,
      enum: ['draft', 'sent', 'under_review', 'signed', 'declined'],
      default: 'draft',
    },
    founderSignature: {
      signed: { type: Boolean, default: false },
      signatureDataUrl: { type: String, default: null },
      signedAt: { type: Date, default: null },
      signerName: { type: String, default: '' },
    },
    investorSignature: {
      signed: { type: Boolean, default: false },
      signatureDataUrl: { type: String, default: null },
      signedAt: { type: Date, default: null },
      signerName: { type: String, default: '' },
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TermSheet', termSheetSchema);
