import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { districtsTable } from "./districts";

export const citiesTable = pgTable("cities", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  nameHi: text("name_hi"),
  districtId: integer("district_id").notNull().references(() => districtsTable.id),
  distanceFromHq: text("distance_from_hq"),
  description: text("description").notNull(),
  uniqueContent: text("unique_content"),
  keywords: text("keywords").array().notNull().default([]),
  latitude: text("latitude"),
  longitude: text("longitude"),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertCitySchema = createInsertSchema(citiesTable).omit({ id: true, createdAt: true });
export type InsertCity = z.infer<typeof insertCitySchema>;
export type City = typeof citiesTable.$inferSelect;
