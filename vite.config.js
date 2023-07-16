import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/google-api": {
        target: "https://maps.googleapis.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/google-api/, "/maps/api"),
      },
      // Proxy API requests to Wikidata
      "/wikidata-api": {
        target: "https://www.wikidata.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wikidata-api/, "/w/api.php"),
      },
      // Proxy API requests to Wikimedia Commons
      "/commons-api": {
        target: "https://commons.wikimedia.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/commons-api/, "/w/api.php"),
      },
    },
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve("src/"),
      pages: path.resolve("src/pages"),
      components: path.resolve("src/components"),
      examples: path.resolve("src/examples"),
      assets: path.resolve("src/assets"),
      store: path.resolve("src/store"),
      layouts: path.resolve("src/layouts"),
      util: path.resolve("src/util"),
      hooks: path.resolve("src/hooks"),
      "footer.routes": path.resolve("src/footer.routes.jsx"),
      routes: path.resolve("src/routes.jsx"),
    },
  },
});
