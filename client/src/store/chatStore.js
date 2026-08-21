import { create } from 'zustand';
import API from '../services/api';

export const useChatStore = create((set, get) => ({
  conversations: [],
  activeConversation: null,
  messages: [],
  isLoading: false,
  typingUser: null,

  fetchConversations: async () => {
    set({ isLoading: true });
    try {
      const res = await API.get('/chat/conversations');
      set({ conversations: res.data.conversations, isLoading: false });
    } catch (err) {
      console.error('Fetch conversations error:', err);
      set({ isLoading: false });
    }
  },

  setActiveConversation: async (conversation) => {
    set({ activeConversation: conversation, messages: [], isLoading: true });
    try {
      const res = await API.get(`/chat/messages/${conversation._id}`);
      set({ messages: res.data.messages, isLoading: false });
    } catch (err) {
      console.error('Fetch messages error:', err);
      set({ isLoading: false });
    }
  },

  startConversation: async (recipientId, startupId = null) => {
    try {
      const res = await API.post('/chat/conversation', { recipientId, startupId });
      const conv = res.data.conversation;
      await get().setActiveConversation(conv);
      await get().fetchConversations();
      return conv;
    } catch (err) {
      console.error('Start conversation error:', err);
      throw err;
    }
  },

  addMessage: (message) => {
    set((state) => {
      // Check if message already exists
      if (state.messages.some((m) => m._id === message._id)) return state;
      return { messages: [...state.messages, message] };
    });
  },

  setTypingUser: (userName) => set({ typingUser: userName }),
}));
