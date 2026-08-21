const mongoose = require('mongoose');

const mentorshipSessionSchema = new mongoose.Schema(
  {
    request: { type: mongoose.Schema.Types.ObjectId, ref: 'MentorshipRequest' },
    founder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sessionTitle: { type: String, required: true },
    date: { type: Date, required: true },
    durationMinutes: { type: Number, default: 45 },
    meetingLink: { type: String, default: 'https://meet.google.com/vc-mentor-session' },
    status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
    feedback: { type: String, default: '' },
    rating: { type: Number, default: 5 },
    tasks: [
      {
        title: { type: String, required: true },
        isCompleted: { type: Boolean, default: false }
      }
    ]
  },
  { timestamps: true, collection: 'mentorSessions' }
);

module.exports = mongoose.model('MentorshipSession', mentorshipSessionSchema);
