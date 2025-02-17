import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertPepehaSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express) {
  app.get("/api/pepeha", async (_req, res) => {
    const pepeha = await storage.getPepeha();
    res.json(pepeha || null);
  });

  app.post("/api/pepeha", async (req, res) => {
    try {
      const data = insertPepehaSchema.parse(req.body);
      const pepeha = await storage.updatePepeha(data);
      res.json(pepeha);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  return createServer(app);
}
