// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://script.google.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/macros/s/AKfycbzq3D14Xl4qUc9T0Pp9_SZ_Xiyzpmv-tkxsclU27p-akCHaBBUAwMLIEL5Eo9MPThN6Iw/exec'),
      },
    },
  },
});