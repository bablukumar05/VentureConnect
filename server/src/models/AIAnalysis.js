const mongoose = require('mongoose');

const aiAnalysisSchema = new mongoose.Schema(
  {
    startup: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup', required: true },
    pitchDeck: { type: mongoose.Schema.Types.ObjectId, ref: 'PitchDeck' },
    executiveSummary: { type: String, default: '' },
    deckParsedWith: { type: String, default: 'Gemini 1.5 Flash AI' },
    pagesCount: { type: Number, default: 1 },
    businessIdeaScore: { type: Number, default: 87 },
    marketAnalysis: {
      tam: { type: String, default: '₹10,000 Cr' },
      sam: { type: String, default: '₹2,500 Cr' },
      som: { type: String, default: '₹350 Cr' },
      growthRateYoY: { type: String, default: '24%' },
      marketDrivers: [{ type: String }],
    },
    swotAnalysis: {
      strengths: [{ type: String }],
      weaknesses: [{ type: String }],
      opportunities: [{ type: String }],
      threats: [{ type: String }],
    },
    riskPrediction: {
      riskLevel: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
      riskScore: { type: Number, default: 22 },
      keyRisks: [{ type: String }],
      mitigationStrategies: [{ type: String }],
    },
    pitchDeckReview: {
      readinessScore: { type: Number, default: 91 },
      strengths: [{ type: String }],
      weaknesses: [{ type: String }],
      suggestions: [{ type: String }],
    },
    investorRecommendation: {
      bestMatch: { type: String, default: 'Sequoia Capital India' },
      confidenceScore: { type: Number, default: 94 },
      reasoning: { type: String, default: 'High alignment with SaaS portfolio and ticket size preference.' },
    },
  },
  { timestamps: true, collection: 'aiAnalysis' }
);

module.exports = mongoose.model('AIAnalysis', aiAnalysisSchema);
