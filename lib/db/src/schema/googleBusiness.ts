import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const googleBusinessConnectionsTable = pgTable("google_business_connections", {
  id: serial("id").primaryKey(),
  googleEmail: text("google_email").notNull().unique(),
  refreshTokenEncrypted: text("refresh_token_encrypted").notNull(),
  selectedAccountName: text("selected_account_name"),
  selectedLocationName: text("selected_location_name"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const googleBusinessActivityTable = pgTable("google_business_activity", {
  id: serial("id").primaryKey(),
  action: text("action").notNull(),
  actorEmail: text("actor_email").notNull(),
  resourceName: text("resource_name"),
  details: jsonb("details").$type<Record<string, unknown>>().notNull().default({}),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type GoogleBusinessConnection = typeof googleBusinessConnectionsTable.$inferSelect;
export type GoogleBusinessActivity = typeof googleBusinessActivityTable.$inferSelect;

