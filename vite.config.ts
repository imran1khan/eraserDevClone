import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { createProxyMiddleware } from 'http-proxy-middleware';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.IS_PREACT": JSON.stringify("true"),
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://eraser_clone.mustafaimrankhan9.workers.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
