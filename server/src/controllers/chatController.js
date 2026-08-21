const chatService = require('../services/chatService');

const getOrCreateConversation = async (req, res) => {
  try {
    const { recipientId, startupId } = req.body;
    const conversation = await chatService.getOrCreateConversation(req.user._id, recipientId, startupId);
    res.status(200).json({ success: true, conversation });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getConversations = async (req, res) => {
  try {
    const conversations = await chatService.getUserConversations(req.user._id);
    res.status(200).json({ success: true, conversations });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await chatService.getConversationMessages(req.params.conversationId);
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { conversationId, text, messageType, fileUrl } = req.body;
    const message = await chatService.saveMessage(
      conversationId,
      req.user._id,
      text,
      messageType,
      fileUrl
    );
    res.status(201).json({ success: true, message });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getOrCreateConversation,
  getConversations,
  getMessages,
  sendMessage,
};
