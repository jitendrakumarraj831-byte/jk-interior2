import { pgTable, serial, text, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const servicesTable = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  shortDescription: text("short_description").notNull(),
  overview: text("overview").notNull(),
  benefits: jsonb("benefits").$type<string[]>().notNull().default([]),
  applications: jsonb("applications").$type<string[]>().notNull().default([]),
  materialsUsed: jsonb("materials_used").$type<string[]>().notNull().default([]),
  installationProcess: jsonb("installation_process")
    .$type<{ step: string; description: string }[]>()
    .notNull()
    .default([]),
  priceRangeMin: integer("price_range_min").notNull(),
  priceRangeMax: integer("price_range_max").notNull(),
  priceUnit: text("price_unit").notNull().default("sq.ft"),
  heroImage: text("hero_image"),
  icon: text("icon"),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertServiceSchema = createInsertSchema(servicesTable).omit({ id: true, createdAt: true });
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof servicesTable.$inferSelect;
