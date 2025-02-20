import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const heritage = pgTable("heritage", {
  id: serial("id").primaryKey(),
  hometown: text("hometown").notNull(),
  hometownGerman: text("hometown_german").notNull(),
  river: text("river").notNull(),
  riverGerman: text("river_german").notNull(),
  region: text("region").notNull(),
  regionGerman: text("region_german").notNull(),
  clan: text("clan").notNull(),
  clanNordic: text("clan_nordic").notNull(),
  settlement: text("settlement").notNull(),
  settlementGerman: text("settlement_german").notNull(),
  ancestors: text("ancestors").notNull(),
  ancestorsNordic: text("ancestors_nordic").notNull(),
});

export const insertHeritageSchema = createInsertSchema(heritage).omit({ id: true });

export type InsertHeritage = z.infer<typeof insertHeritageSchema>;
export type Heritage = typeof heritage.$inferSelect;