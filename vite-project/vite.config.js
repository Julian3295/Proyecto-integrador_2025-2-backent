// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { 
        target: 'https://api-sistema-notas.onrender.com', 
        changeOrigin: true,
        secure: true,
        // ESTA LÍNEA ES EL ARREGLO DEL 404 (debe estar activada)
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
});