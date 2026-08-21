const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    startup: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup' },
    lastMessage: { type: String, default: '' },
    lastMessageAt: { type: Date, default: Date.now },
    unreadCounts: { type: Map, of: Number, default: {} }
  },
  { timestamps: true, collection: 'chatRooms' }
);

module.exports = mongoose.model('Conversation', conversationSchema);
