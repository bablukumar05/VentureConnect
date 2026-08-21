const mongoose = require('mongoose');

const cohortSchema = new mongoose.Schema(
  {
    incubator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cohortName: { type: String, required: true }, // e.g. "Summer 2026 Batch #8"
    description: { type: String, default: '' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startupsCount: { type: Number, default: 12 },
    demoDayDate: { type: Date },
    applications: [
      {
        startupName: { type: String, required: true },
        founderName: { type: String, required: true },
        email: { type: String, required: true },
        stage: { type: String, default: 'Pre-Seed' },
        status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
        submittedAt: { type: Date, default: Date.now },
      },
    ],
    status: { type: String, enum: ['upcoming', 'active', 'completed'], default: 'active' },
  },
  { timestamps: true, collection: 'cohorts' }
);

module.exports = mongoose.model('Cohort', cohortSchema);
