import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://ventureconnect-a8kf.onrender.com',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'https://ventureconnect-a8kf.onrender.com',
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'https://ventureconnect-a8kf.onrender.com',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
