const mongoose = require('mongoose');

const mentorshipRequestSchema = new mongoose.Schema(
  {
    founder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startup: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup' },
    topic: { type: String, required: true },
    goals: { type: String, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    message: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MentorshipRequest', mentorshipRequestSchema);
