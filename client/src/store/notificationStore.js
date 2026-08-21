import { create } from 'zustand';
import API from '../services/api';

export const useNotificationStore = create((set) => ({
  notifications: [],
  unreadCount: 0,

  fetchNotifications: async () => {
    try {
      const res = await API.get('/notifications');
      const list = res.data.notifications;
      const unread = list.filter((n) => !n.isRead).length;
      set({ notifications: list, unreadCount: unread });
    } catch (err) {
      console.error('Fetch notifications error:', err);
    }
  },

  addNotification: (notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },

  markAsRead: async (id) => {
    try {
      await API.put(`/notifications/${id}/read`);
      set((state) => {
        const updated = state.notifications.map((n) =>
          n._id === id ? { ...n, isRead: true } : n
        );
        return {
          notifications: updated,
          unreadCount: Math.max(0, state.unreadCount - 1),
        };
      });
    } catch (err) {
      console.error('Mark read error:', err);
    }
  },

  markAllAsRead: async () => {
    try {
      await API.put('/notifications/mark-all-read');
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
        unreadCount: 0,
      }));
    } catch (err) {
      console.error('Mark all read error:', err);
    }
  },
}));
