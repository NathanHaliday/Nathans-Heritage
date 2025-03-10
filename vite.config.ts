import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  base: "/Nathans-Heritage/", // Set correct base path for GitHub Pages
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined
      ? require("@replit/vite-plugin-cartographer").cartographer()
      : null,
  ].filter(Boolean), // Remove null values from the plugin array
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: __dirname,
  build: {
    outDir: path.resolve(__dirname, "docs"), // Change from "dist" to "docs" for GitHub Pages
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: true,
    allowedHosts: [
      "localhost",
      "nathanhaliday.github.io", // Ensure GitHub Pages host is allowed
    ],
  },
});
