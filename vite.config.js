import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/Synork-Technologies-/',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        signup: resolve(__dirname, 'signup.html'),
        careers: resolve(__dirname, 'careers.html'),
      }
    }
  }
})
