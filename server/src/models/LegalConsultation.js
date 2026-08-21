const mongoose = require('mongoose');

const legalConsultationSchema = new mongoose.Schema(
  {
    startup: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup', required: true },
    founder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    legalAdvisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: {
      type: String,
      enum: ['compliance', 'contract_review', 'trademark', 'incorporation', 'due_diligence'],
      default: 'compliance',
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in_review', 'completed'], default: 'pending' },
    documentUrl: { type: String, default: '' },
    advisorNotes: { type: String, default: '' },
  },
  { timestamps: true, collection: 'legalConsultations' }
);

module.exports = mongoose.model('LegalConsultation', legalConsultationSchema);
