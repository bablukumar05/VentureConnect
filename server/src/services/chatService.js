const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

const getOrCreateConversation = async (userId1, userId2, startupId = null) => {
  let conversation = await Conversation.findOne({
    participants: { $all: [userId1, userId2] },
  }).populate('participants', 'name email avatar role bio');

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [userId1, userId2],
      startup: startupId,
    });
    conversation = await conversation.populate('participants', 'name email avatar role bio');
  }

  return conversation;
};

const getUserConversations = async (userId) => {
  return await Conversation.find({ participants: userId })
    .populate('participants', 'name email avatar role bio')
    .sort({ lastMessageAt: -1 });
};

const getConversationMessages = async (conversationId) => {
  return await Message.find({ conversation: conversationId })
    .populate('sender', 'name email avatar')
    .sort({ createdAt: 1 });
};

const saveMessage = async (conversationId, senderId, text, messageType = 'text', fileUrl = '') => {
  const message = await Message.create({
    conversation: conversationId,
    sender: senderId,
    text,
    messageType,
    fileUrl,
  });

  await Conversation.findByIdAndUpdate(conversationId, {
    lastMessage: text,
    lastMessageAt: new Date(),
  });

  return await message.populate('sender', 'name email avatar');
};

module.exports = {
  getOrCreateConversation,
  getUserConversations,
  getConversationMessages,
  saveMessage,
};
