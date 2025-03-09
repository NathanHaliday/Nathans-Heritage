import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    // Only add cartographer plugin if the environment matches
    process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined
      ? require("@replit/vite-plugin-cartographer").cartographer()
      : null,
  ].filter(Boolean), // filter out null values from the plugin array
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: __dirname,
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",  // Allow access from any host
    port: 5000,
    strictPort: true,
    allowedHosts: [
      "localhost",
      "https://nathanhaliday.github.io/Nathans-Heritage/",  // Add Replit URL here
    ],
  },
});
