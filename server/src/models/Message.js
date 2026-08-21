const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    fileUrl: { type: String, default: '' },
    messageType: { type: String, enum: ['text', 'pitch_deck', 'image', 'file'], default: 'text' },
    isRead: { type: Boolean, default: false },
    readAt: { type: Date }
  },
  { timestamps: true, collection: 'messages' }
);

module.exports = mongoose.model('Message', messageSchema);
