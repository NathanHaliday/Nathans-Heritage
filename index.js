// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var heritage = pgTable("heritage", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  land: text("land").notNull(),
  river: text("river").notNull(),
  ancestors: text("ancestors").notNull(),
  people: text("people").notNull(),
  home: text("home").notNull()
});
var insertHeritageSchema = createInsertSchema(heritage).omit({ id: true });
var defaultHeritage = {
  name: "Nathan Haliday",
  land: "New Zealand",
  river: "Waikato River",
  ancestors: "Nordic and British",
  people: "Pokeno Razorbacks Softball Club",
  home: "Pokeno"
};

// server/storage.ts
var MemStorage = class {
  heritage;
  currentId = 1;
  constructor() {
    this.heritage = { ...defaultHeritage, id: this.currentId };
  }
  async getHeritage() {
    return this.heritage;
  }
  async updateHeritage(insertHeritage) {
    this.heritage = { ...insertHeritage, id: this.currentId };
    return this.heritage;
  }
};
var storage = new MemStorage();

// server/routes.ts
import { ZodError } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/heritage", async (_req, res) => {
    const heritage2 = await storage.getHeritage();
    res.json(heritage2 || null);
  });
  app2.post("/api/heritage", async (req, res) => {
    try {
      const data = insertHeritageSchema.parse(req.body);
      const heritage2 = await storage.updateHeritage(data);
      res.json(heritage2);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });
  return createServer(app2);
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { copyFileSync } from "fs";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig(() => {
  return {
    base: "/Nathans-Heritage",
    // Ensure GitHub Pages serves assets correctly
    plugins: [
      react()
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared")
      }
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
    },
    root: path.resolve(__dirname, "client"),
    build: {
      outDir: path.resolve(__dirname, "dist"),
      emptyOutDir: true,
      rollupOptions: {
        plugins: [
          {
            name: "copy-redirects",
            closeBundle: () => {
              copyFileSync("_redirects", path.resolve(__dirname, "dist/_redirects"));
            }
          }
        ]
      }
    }
  };
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
var isProduction = process.env.NODE_ENV === "production";
var indexHtmlPath = isProduction ? path2.resolve(__dirname2, "..", "docs", "index.html") : path2.resolve(__dirname2, "..", "client", "index.html");
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: {
      middlewareMode: true,
      // Important for using Vite in middleware mode with Express
      hmr: { clientPort: 5e3 }
      // Ensure that HMR works on port 5000
    },
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      let template = await fs.promises.readFile(indexHtmlPath, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "..");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const PORT = 5e3;
  server.listen(PORT, "0.0.0.0", () => {
    log(`serving on port ${PORT}`);
  });
})();
