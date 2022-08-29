import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./",
  publicDir: "assets/",
  resolve: {
    alias: {
      '/images': 'src/assets/images',
    }
  },
  server: {
    proxy: {
      "/api": {
        ws: false,
        target: "http://localhost/api",
        changeOrigin: true,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/ws": {
        ws: false,
        target: "ws://172.17.0.1:8889/ws",
        changeOrigin: true,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        rewrite: (path) => path.replace(/^\/ws/, ""),
      },
    },
  },
})
