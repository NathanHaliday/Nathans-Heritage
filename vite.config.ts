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
  base: "/Nathans-Heritage/", // Ensure correct base path for GitHub Pages
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
  root: path.resolve(__dirname, "docs"), // Ensure index.html is inside docs/
  build: {
    outDir: path.resolve(__dirname, "docs/build"), // Keeps built files inside docs/build
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: true,
    allowedHosts: ["localhost", "nathanhaliday.github.io"], // Allow all hosts (GitHub Codespaces friendly)
  },
});
