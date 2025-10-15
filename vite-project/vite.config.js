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
        secure: true, // Volvemos a 'true'
        // 🎯 ESTA LÍNEA ES LA SOLUCIÓN DEL 404
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
});