import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Support both GitHub Pages (e.g. /MacMint/ or relative) and custom root domains
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          d3: ['d3'],
          icons: ['lucide-react'],
        },
      },
    },
  },
});
