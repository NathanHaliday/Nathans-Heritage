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
  base: "/Nathans-Heritage/", // Ensure this matches your actual deployment URL
  plugins: [react(), runtimeErrorOverlay(), themePlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: path.resolve(__dirname, "docs"), // Keep source files in "docs"
  build: {
    outDir: path.resolve(__dirname, "dist"), // Output files go here (avoid overwriting "docs")
    emptyOutDir: true,
    assetsDir: "assets",
    rollupOptions: {
      external: ["/Nathans-Heritage/assets/index-COVJcvtA.js", "fsevents"],
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: true,
    allowedHosts: ["localhost", "nathanhaliday.github.io"],
  },
});