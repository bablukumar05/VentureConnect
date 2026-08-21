const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  linkedin: { type: String, default: '' },
  avatar: { type: String, default: '' },
});

const startupSchema = new mongoose.Schema(
  {
    founder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startupName: { type: String, required: true, trim: true },
    logo: { type: String, default: '' },
    tagline: { type: String, required: true, trim: true },
    industry: { type: String, required: true, trim: true }, // e.g., FinTech, HealthTech, AI/ML, SaaS, EdTech, E-commerce
    stage: {
      type: String,
      enum: ['Idea', 'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Growth'],
      default: 'Seed',
    },
    description: { type: String, required: true },
    team: [teamMemberSchema],
    businessModel: { type: String, required: true }, // B2B, B2C, Marketplace, SaaS, B2B2C
    marketSize: { type: String, default: '₹10,000 Cr TAM' },
    fundingRequirement: { type: Number, required: true }, // In INR (e.g. 5000000 for 50 Lakhs)
    fundingRaised: { type: Number, default: 0 },
    equityOffered: { type: Number, default: 10 }, // percentage
    investmentType: { type: String, enum: ['Equity', 'SAFE', 'Convertible Note', 'Debt'], default: 'Equity' },
    location: { type: String, default: 'Bangalore, India' },
    website: { type: String, default: '' },
    pitchDeck: { type: mongoose.Schema.Types.ObjectId, ref: 'PitchDeck' },
    status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'verified' },
    potentialScore: { type: Number, default: 85 }, // 0 to 100
    metrics: {
      mrr: { type: Number, default: 250000 },
      arr: { type: Number, default: 3000000 },
      usersCount: { type: Number, default: 12000 },
      growthRate: { type: Number, default: 18 }, // percentage
    },
    riskProfile: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  },
  { timestamps: true, collection: 'startups' }
);

module.exports = mongoose.model('Startup', startupSchema);
