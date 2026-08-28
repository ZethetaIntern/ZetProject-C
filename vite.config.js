import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      all: true,
      include: ['src/**/*.js', 'src/**/*.jsx'],
      exclude: ['src/**/*.stories.jsx', 'src/test/**', 'src/main.jsx', 'src/components/GridManager.jsx'],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('zustand') || id.includes('dompurify') || id.includes('zod')) {
              return 'vendor-core';
            }
            if (id.includes('recharts') || id.includes('d3')) {
              return 'vendor-charts';
            }
            return 'vendor-others';
          }
          if (id.includes('src/widgets/')) {
            const parts = id.split('/');
            const fileName = parts[parts.length - 1];
            const name = fileName.replace(/\.jsx?$/, '');
            return `widget-${name.toLowerCase()}`;
          }
        },
      },
    },
  },
})
