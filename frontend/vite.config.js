import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      // Force axios to use browser build on Vercel Linux Rolldown
      'axios/lib/platform/index.js': path.resolve(
        './node_modules/axios/lib/platform/browser/index.js'
      ),
    },
  },
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/react-router-dom/')) {
              return 'vendor';
            }
            if (id.includes('/recharts/')) {
              return 'charts';
            }
            if (id.includes('/jspdf/') || id.includes('/html2canvas/')) {
              return 'pdf';
            }
          }
        },
      },
    },
  },
})