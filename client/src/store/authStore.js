import { create } from 'zustand';
import API from '../services/api';
import { initSocket, disconnectSocket } from '../services/socket';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await API.post('/auth/login', { email, password });
      const { token, ...userData } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      initSocket(userData._id);
      set({ user: userData, token, isLoading: false });
      return userData;
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      set({ error: msg, isLoading: false });
      throw new Error(msg);
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await API.post('/auth/register', userData);
      const { token, ...newUserData } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(newUserData));

      initSocket(newUserData._id);
      set({ user: newUserData, token, isLoading: false });
      return newUserData;
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      set({ error: msg, isLoading: false });
      throw new Error(msg);
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    disconnectSocket();
    set({ user: null, token: null });
  },

  updateUser: (updatedData) => {
    set((state) => {
      const newUser = { ...state.user, ...updatedData };
      localStorage.setItem('user', JSON.stringify(newUser));
      return { user: newUser };
    });
  },
}));
