/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      all: true,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.stories.tsx', 'src/test/**', 'src/main.tsx', 'src/vite-env.d.ts', 'src/components/GridManager.tsx'],
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
            const name = fileName.replace(/\.tsx?$/, '');
            return `widget-${name.toLowerCase()}`;
          }
        },
      },
    },
  },
})
