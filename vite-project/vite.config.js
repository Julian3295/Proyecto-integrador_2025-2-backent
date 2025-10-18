// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { 
        // 🎯 La URL de la API del profesor
        target: 'https://api-sistema-notas.onrender.com', 
        changeOrigin: true,
        secure: true,
        // 🎯 CRUCIAL: Reemplazar el prefijo /api/ por la ruta vacía
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
});