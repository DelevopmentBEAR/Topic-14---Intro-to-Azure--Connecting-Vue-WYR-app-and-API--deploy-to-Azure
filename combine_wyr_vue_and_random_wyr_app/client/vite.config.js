import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // Requests to http://localhost:5173/wyr to go to http://localhost:3000/wyr (our Express server)
      '/wyr': 'http://localhost:3000/' // Proxy requests to /wyr to our Express server running on port 3000
    }
  }
})
