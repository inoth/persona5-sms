import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        ws: false,
        target: "http://localhost:8888/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/api/chat": {
        ws: false,
        target: "http://localhost:8889/api/chat",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chat/, ""),
      },
    },
  },
})
