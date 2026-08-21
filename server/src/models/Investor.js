const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firmName: { type: String, default: 'Angel Syndicate' },
    investmentRange: {
      min: { type: Number, default: 500000 },  // ₹5 Lakhs
      max: { type: Number, default: 10000000 } // ₹1 Crore
    },
    industries: [{ type: String }], // e.g. ["FinTech", "AI/ML", "SaaS", "HealthTech"]
    preferredStages: [{ type: String }], // e.g. ["Pre-Seed", "Seed", "Series A"]
    geography: { type: String, default: 'India' },
    investmentTypes: [{ type: String }], // e.g. ["Equity", "SAFE", "Convertible Note"]
    experienceYears: { type: Number, default: 8 },
    totalInvestments: { type: Number, default: 14 },
    bio: { type: String, default: '' },
    ticketSizeLabel: { type: String, default: '₹10L - ₹1Cr' },
    riskTolerance: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    status: { type: String, enum: ['pending', 'verified', 'blocked'], default: 'verified' }
  },
  { timestamps: true, collection: 'investors' }
);

module.exports = mongoose.model('Investor', investorSchema);
