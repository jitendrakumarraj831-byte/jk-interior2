import { pgTable, serial, text, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { citiesTable } from "./cities";
import { servicesTable } from "./services";

export const spaceTypes = [
  "residential",
  "commercial",
  "office",
  "hotel",
  "hospital",
  "school",
] as const;

export const projectsTable = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  serviceId: integer("service_id").references(() => servicesTable.id),
  cityId: integer("city_id").references(() => citiesTable.id),
  spaceType: text("space_type", { enum: spaceTypes }).notNull().default("residential"),
  materialTags: text("material_tags").array().notNull().default([]),
  areaSqft: integer("area_sqft"),
  materials: text("materials"),
  timeline: text("timeline"),
  costRangeMin: integer("cost_range_min"),
  costRangeMax: integer("cost_range_max"),
  challenge: text("challenge"),
  solution: text("solution"),
  beforeImage: text("before_image"),
  afterImage: text("after_image"),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  customerName: text("customer_name"),
  customerReview: text("customer_review"),
  customerRating: integer("customer_rating"),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertProjectSchema = createInsertSchema(projectsTable).omit({ id: true, createdAt: true });
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projectsTable.$inferSelect;
