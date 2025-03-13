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
  base: "/Nathans-Heritage/", // Make sure this base path matches your deployment structure
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: path.resolve(__dirname, "docs"), // Root folder for Vite
  build: {
    outDir: path.resolve(__dirname, "docs"), // Ensure output goes to the correct directory
    emptyOutDir: true,
    assetsDir: "assets", // Ensure assets are put inside the 'assets' directory
    rollupOptions: {
      external: ["fsevents"], // Exclude external dependencies from the build
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: true,
    allowedHosts: ["localhost", "nathanhaliday.github.io"], // Include allowed hosts
  },
});