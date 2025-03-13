import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import { fileURLToPath } from "url";

// Determine if we are in development mode
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  base: isProduction ? "/Nathans-Heritage/" : "/", // Use "/" for dev, "/Nathans-Heritage/" for GitHub Pages
  plugins: [react(), themePlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "docs"), // Use 'docs' for GitHub Pages
    emptyOutDir: true, // Ensures docs/ is cleared before every build
    assetsDir: "assets", // Outputs assets in the "assets" folder
    rollupOptions: {
      input: path.resolve(__dirname, "client/index.html"), // Ensure correct entry
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
      },
      external: isProduction ? ["fsevents"] : [], // Exclude external dependencies
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: true,
    open: true,
    watch: {
      usePolling: true, // Useful for some development environments
    },
  },
});