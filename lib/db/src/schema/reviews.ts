import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { districtsTable } from "./districts";
import { citiesTable } from "./cities";

export const reviewsTable = pgTable("reviews", {
  id: serial("id").primaryKey(),
  authorName: text("author_name").notNull(),
  rating: integer("rating").notNull().default(5),
  text: text("text").notNull(),
  source: text("source").notNull().default("google"),
  districtId: integer("district_id").references(() => districtsTable.id),
  cityId: integer("city_id").references(() => citiesTable.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertReviewSchema = createInsertSchema(reviewsTable).omit({ id: true, createdAt: true });
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviewsTable.$inferSelect;
