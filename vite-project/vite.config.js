import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // ESTO DEBE SER EXACTO
    proxy: {
      '/api': { 
        target: 'https://api-sistema-notas.onrender.com', // El enlace de tu profesor
        changeOrigin: true,
        secure: true,
      },
    },
  },
});