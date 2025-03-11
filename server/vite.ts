import express, { type Express } from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const viteLogger = createLogger();

// Check the environment to know if it's production or development
const isProduction = process.env.NODE_ENV === "production";

// Set the correct path based on the environment
const indexHtmlPath = isProduction
  ? path.resolve(__dirname, "..", "docs", "index.html")  // Production path (docs folder)
  : path.resolve(__dirname, "..", "docs", "index.html");  // Development path (docs folder)

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  if (!isProduction) {
    // Only create the Vite server if in development mode
    const vite = await createViteServer({
      ...viteConfig,
      configFile: false,
      customLogger: {
        ...viteLogger,
        error: (msg, options) => {
          viteLogger.error(msg, options);
          process.exit(1);
        },
      },
      server: {
        middlewareMode: true, // Important for using Vite in middleware mode with Express
        hmr: { clientPort: 5000 }, // Ensure that HMR works on port 5000
      },
      appType: "custom",
    });

    app.use(vite.middlewares);

    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;

      try {
        // Use the correct index.html path based on the environment
        let template = await fs.promises.readFile(indexHtmlPath, "utf-8");

        // Modify the template (e.g., versioning)
        template = template.replace(
          `src="/src/main.tsx"`,
          `src="/src/main.tsx?v=${nanoid()}"`,
        );
        const page = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(page);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  }
}

export function serveStatic(app: Express) {
  const docsPath = path.resolve(__dirname, "..", "docs"); // Updated to 'docs' folder

  if (!fs.existsSync(docsPath)) {
    throw new Error(
      `Could not find the build directory: ${docsPath}, make sure to build the client first`,
    );
  }

  // Serve static files from the docs folder
  app.use(express.static(docsPath));

  // For all other routes (especially client-side routing), send the index.html
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(docsPath, "index.html")); // Serve index.html from 'docs'
  });
}

// Create an Express server and listen on port 5000
export function startServer(app: Express) {
  const server = app.listen(5000, () => {
    console.log("Server running on port 5000");
  });

  server.on("error", (err) => {
    console.error("Server Error:", err);
  });

  return server;
}
