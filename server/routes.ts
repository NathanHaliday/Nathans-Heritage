import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertHeritageSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express) {
  app.get("/api/heritage", async (_req, res) => {
    const heritage = await storage.getHeritage();
    res.json(heritage || null);
  });

  app.post("/api/heritage", async (req, res) => {
    try {
      const data = insertHeritageSchema.parse(req.body);
      const heritage = await storage.updateHeritage(data);
      res.json(heritage);
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