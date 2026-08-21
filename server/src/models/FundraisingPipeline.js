const mongoose = require('mongoose');

const fundraisingPipelineSchema = new mongoose.Schema(
  {
    startup: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup', required: true },
    founder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    investorName: { type: String, required: true },
    investorFirm: { type: String, default: 'Angel Syndicate' },
    targetAmount: { type: Number, required: true },
    stage: {
      type: String,
      enum: ['Contacted', 'Meeting Scheduled', 'Interested', 'Due Diligence', 'Funding Closed'],
      default: 'Contacted',
    },
    notes: { type: String, default: '' },
    lastContactDate: { type: Date, default: Date.now },
  },
  { timestamps: true, collection: 'fundraisingPipelines' }
);

module.exports = mongoose.model('FundraisingPipeline', fundraisingPipelineSchema);
