// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://sandbox.academiadevelopers.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
}
