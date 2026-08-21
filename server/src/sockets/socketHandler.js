const { saveMessage } = require('../services/chatService');

const onlineUsers = new Map(); // userId -> socketId

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(`[Socket Connected]: ${socket.id}`);

    // Register active user ID
    socket.on('register_user', (userId) => {
      if (userId) {
        onlineUsers.set(userId, socket.id);
        io.emit('online_users_list', Array.from(onlineUsers.keys()));
        console.log(`[Socket User Registered]: User ${userId} -> Socket ${socket.id}`);
      }
    });

    // Join room for conversation
    socket.on('join_conversation', (conversationId) => {
      socket.join(conversationId);
      console.log(`[Socket Room Joined]: Socket ${socket.id} joined conversation ${conversationId}`);
    });

    // Handle sending message
    socket.on('send_message', async (data) => {
      try {
        const { conversationId, senderId, text, messageType, fileUrl } = data;
        const savedMsg = await saveMessage(conversationId, senderId, text, messageType, fileUrl);

        // Broadcast to conversation room
        io.to(conversationId).emit('new_message', savedMsg);
      } catch (err) {
        console.error('Socket send_message error:', err);
      }
    });

    // Typing indicators
    socket.on('typing', ({ conversationId, userId, userName }) => {
      socket.to(conversationId).emit('user_typing', { conversationId, userId, userName });
    });

    socket.on('stop_typing', ({ conversationId, userId }) => {
      socket.to(conversationId).emit('user_stop_typing', { conversationId, userId });
    });

    // Notifications & Funding Updates
    socket.on('send_notification', ({ recipientId, notification }) => {
      const recipientSocketId = onlineUsers.get(recipientId);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('new_notification', notification);
      }
    });

    socket.on('funding_update', (fundingData) => {
      io.emit('funding_progress_changed', fundingData);
    });

    // Disconnect
    socket.on('disconnect', () => {
      for (const [userId, sId] of onlineUsers.entries()) {
        if (sId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      io.emit('online_users_list', Array.from(onlineUsers.keys()));
      console.log(`[Socket Disconnected]: ${socket.id}`);
    });
  });
};

module.exports = socketHandler;
