import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const pepeha = pgTable("pepeha", {
  id: serial("id").primaryKey(),
  maunga: text("maunga").notNull(),
  maungaEnglish: text("maunga_english").notNull(),
  awa: text("awa").notNull(),
  awaEnglish: text("awa_english").notNull(),
  iwi: text("iwi").notNull(),
  iwiEnglish: text("iwi_english").notNull(),
  hapu: text("hapu").notNull(),
  hapuEnglish: text("hapu_english").notNull(),
  marae: text("marae").notNull(),
  maraeEnglish: text("marae_english").notNull(),
  tupuna: text("tupuna").notNull(),
  tupunaEnglish: text("tupuna_english").notNull(),
});

export const insertPepehaSchema = createInsertSchema(pepeha).omit({ id: true });

export type InsertPepeha = z.infer<typeof insertPepehaSchema>;
export type Pepeha = typeof pepeha.$inferSelect;
