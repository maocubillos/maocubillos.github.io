import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  // This correctly builds to the 'docs' folder for GitHub Pages
  build: {
    outDir: "docs",
    rollupOptions: {
      output: {
        manualChunks: {
          supabase: ["@supabase/supabase-js"],
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
});

