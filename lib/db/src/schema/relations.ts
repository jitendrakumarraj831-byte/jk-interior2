import { relations } from "drizzle-orm";
import { districtsTable } from "./districts";
import { citiesTable } from "./cities";
import { servicesTable } from "./services";
import { projectsTable } from "./projects";
import { galleryItemsTable } from "./galleryItems";
import { blogPostsTable } from "./blogPosts";
import { reviewsTable } from "./reviews";

export const districtsRelations = relations(districtsTable, ({ many }) => ({
  cities: many(citiesTable),
  blogPosts: many(blogPostsTable),
  reviews: many(reviewsTable),
}));

export const citiesRelations = relations(citiesTable, ({ one, many }) => ({
  district: one(districtsTable, { fields: [citiesTable.districtId], references: [districtsTable.id] }),
  projects: many(projectsTable),
  reviews: many(reviewsTable),
}));

export const servicesRelations = relations(servicesTable, ({ many }) => ({
  projects: many(projectsTable),
}));

export const projectsRelations = relations(projectsTable, ({ one, many }) => ({
  service: one(servicesTable, { fields: [projectsTable.serviceId], references: [servicesTable.id] }),
  city: one(citiesTable, { fields: [projectsTable.cityId], references: [citiesTable.id] }),
  galleryItems: many(galleryItemsTable),
}));

export const galleryItemsRelations = relations(galleryItemsTable, ({ one }) => ({
  project: one(projectsTable, { fields: [galleryItemsTable.projectId], references: [projectsTable.id] }),
}));

export const blogPostsRelations = relations(blogPostsTable, ({ one }) => ({
  district: one(districtsTable, { fields: [blogPostsTable.districtId], references: [districtsTable.id] }),
}));

export const reviewsRelations = relations(reviewsTable, ({ one }) => ({
  district: one(districtsTable, { fields: [reviewsTable.districtId], references: [districtsTable.id] }),
  city: one(citiesTable, { fields: [reviewsTable.cityId], references: [citiesTable.id] }),
}));
