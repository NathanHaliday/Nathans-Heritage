import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  base: "/Nathans-Heritage/", // Correct base path for GitHub Pages
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"), // Adjust based on your structure
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: path.resolve(__dirname, "docs"), // Root is docs/ folder where index.html is located
  build: {
    outDir: path.resolve(__dirname, "dist"), // Change the output directory to `dist` (not `docs`)
    emptyOutDir: true, // Clean dist folder before build
    assetsDir: "assets", // Place assets inside dist/assets
    rollupOptions: {
      external: ["fsevents"], // Exclude fsevents from the build
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: true,
    allowedHosts: ["localhost", "nathanhaliday.github.io"], // Allow all hosts (GitHub Codespaces friendly)
  },
});
