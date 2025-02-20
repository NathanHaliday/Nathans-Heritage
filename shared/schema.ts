import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const heritage = pgTable("heritage", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  land: text("land").notNull(),
  river: text("river").notNull(),
  ancestors: text("ancestors").notNull(),
  people: text("people").notNull(),
  home: text("home").notNull(),
});

export const insertHeritageSchema = createInsertSchema(heritage).omit({ id: true });

export type InsertHeritage = z.infer<typeof insertHeritageSchema>;
export type Heritage = typeof heritage.$inferSelect;