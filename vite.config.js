import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
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
      "routes": path.resolve("src/routes.jsx"),
    },
  },
});
