import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  build: {
    outDir: path.join(__dirname, "docs/"),
    rollupOptions: {
      input: {
        preview: path.resolve(__dirname, "index.html"),
      },
    },
  },
  server: {
    strictPort: true,
    port: 8001,
    hmr: {
      clientPort: 8001,
    },
  },
  root: path.join(__dirname, "/"),
  plugins: [react()],
  /**
   * @note Resolve `~` in SCSS modules.
   * {@see https://github.com/vitejs/vite/issues/5764#issuecomment-982407332}
   */
  resolve: {
    alias: [
      {
        find: /^~(.*)$/,
        replacement: "$1",
      },
    ],
  },
});

