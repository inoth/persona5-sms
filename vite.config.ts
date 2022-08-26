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
        // headers: {
        //   "Access-Control-Allow-Origin": "*"
        // },
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/ws": {
        ws: false,
        target: "ws://localhost:8889/ws",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ws/, ""),
      },
    },
  },
})
