import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: '../server/public',
    emptyOutDir: true
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      },
      '/restaurant': {
        target: 'http://localhost:3000'
      }
    }
  }
})
