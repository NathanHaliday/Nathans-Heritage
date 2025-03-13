import express, { Express, Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer, createLogger } from "vite";
import viteConfig from "../vite.config";
import { Server } from "http";

const __filename = new URL('', import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const viteLogger = createLogger();

const isProduction = process.env.NODE_ENV === "production";

const buildDir = isProduction
  ? path.resolve(__dirname, "..", "docs") // Uses "docs" for GitHub Pages
  : path.resolve(__dirname, "..", "dev"); // A separate "dev" folder for development builds

export async function setupVite(app: Express, server: any) {
  if (!isProduction) {
    const vite = await createViteServer({
      configFile: path.resolve(__dirname, "../vite.config.ts"),
      server: {
        middlewareMode: true,
        hmr: { port: 5001 }, // Ensure the Vite dev server works on port 5001
      },
      appType: "custom",
    });

    app.use(vite.middlewares);

    app.use("*", async (req: Request, res: Response, next: NextFunction) => {
      try {
        const url = req.originalUrl;
        const filePath = path.resolve(__dirname, "..", "client", "index.html");

        let template = await fs.promises.readFile(filePath, "utf-8");
        const transformedHtml = await vite.transformIndexHtml(url, template);

        res.status(200).set({ "Content-Type": "text/html" }).send(transformedHtml);
      } catch (error) {
        vite.ssrFixStacktrace(error as Error);
        next(error);
      }
    });
  } else {
    // Production mode: Serve from the built `docs/` directory
    app.use(express.static(buildDir));

    app.get("*", (req: Request, res: Response) => {
      try {
        const indexHtmlPath = path.join(buildDir, "index.html");
        res.sendFile(indexHtmlPath);
      } catch (error) {
        console.error("Error serving index.html:", error);
        res.status(500).send("Internal Server Error");
      }
    });
  }
}