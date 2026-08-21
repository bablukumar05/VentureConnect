const mongoose = require('mongoose');

const HealthScoreSchema = new mongoose.Schema(
  {
    startup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Startup',
      required: true,
      index: true,
    },
    overallScore: {
      type: Number,
      default: 85,
      min: 0,
      max: 100,
    },
    statusLevel: {
      type: String,
      enum: ['Excellent', 'Strong', 'Needs Improvement', 'At Risk', 'Critical'],
      default: 'Strong',
    },
    monthlyChange: {
      type: Number,
      default: 4,
    },
    breakdown: {
      profileCompleteness: { type: Number, default: 90 },
      teamStrength: { type: Number, default: 84 },
      investorReadiness: { type: Number, default: 91 },
      fundingReadiness: { type: Number, default: 80 },
      businessTraction: { type: Number, default: 87 },
    },
    scoreHistory: [
      {
        month: { type: String, required: true },
        score: { type: Number, required: true },
      },
    ],
    scoreChanges: [
      {
        points: { type: String, required: true },
        reason: { type: String, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    recommendations: [
      {
        title: { type: String, required: true },
        impact: { type: Number, required: true },
        priority: { type: String, enum: ['high', 'medium', 'low'], default: 'high' },
        category: { type: String, default: 'Finance' },
        actionLink: { type: String, default: '/founder/pitch-deck' },
      },
    ],
    version: {
      type: String,
      default: '1.0.0',
    },
    calculatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HealthScore', HealthScoreSchema);
