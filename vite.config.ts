import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  // This is correct for a maocubillos.github.io repository
  base: "./",
  plugins: [react()],
  // This correctly builds to the 'docs' folder for GitHub Pages
  build: {
    outDir: "docs",
  },
});

