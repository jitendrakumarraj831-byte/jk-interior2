import "server-only";
import { db } from "@workspace/db";
import {
  districtsTable,
  citiesTable,
  servicesTable,
  projectsTable,
  galleryItemsTable,
  reviewsTable,
  faqsTable,
  blogPostsTable,
} from "@workspace/db/schema";
import { and, asc, desc, eq } from "drizzle-orm";

export function getDistricts() {
  return db.query.districtsTable.findMany({ orderBy: asc(districtsTable.displayOrder) });
}

export async function getDistrictBySlug(slug: string) {
  return db.query.districtsTable.findFirst({ where: eq(districtsTable.slug, slug) });
}

export async function getNearbyDistricts(currentSlug: string, limit = 3) {
  const all = await getDistricts();
  return all.filter((d) => d.slug !== currentSlug).slice(0, limit);
}

export function getCitiesByDistrictId(districtId: number) {
  return db.query.citiesTable.findMany({
    where: eq(citiesTable.districtId, districtId),
    orderBy: asc(citiesTable.displayOrder),
  });
}

export async function getCityBySlug(slug: string) {
  return db.query.citiesTable.findFirst({
    where: eq(citiesTable.slug, slug),
    with: { district: true },
  });
}

export async function getNearbyCities(districtId: number, currentCitySlug: string, limit = 4) {
  const cities = await getCitiesByDistrictId(districtId);
  return cities.filter((c) => c.slug !== currentCitySlug).slice(0, limit);
}

export function getServices() {
  return db.query.servicesTable.findMany({ orderBy: asc(servicesTable.displayOrder) });
}

export async function getServiceBySlug(slug: string) {
  return db.query.servicesTable.findFirst({ where: eq(servicesTable.slug, slug) });
}

export async function getRelatedServices(currentSlug: string, limit = 3) {
  const all = await getServices();
  return all.filter((s) => s.slug !== currentSlug).slice(0, limit);
}

export function getProjects() {
  return db.query.projectsTable.findMany({
    orderBy: asc(projectsTable.displayOrder),
    with: { city: { with: { district: true } }, service: true },
  });
}

export async function getProjectBySlug(slug: string) {
  return db.query.projectsTable.findFirst({
    where: eq(projectsTable.slug, slug),
    with: { city: { with: { district: true } }, service: true, galleryItems: true },
  });
}

export async function getFeaturedProjects(limit = 3) {
  const all = await getProjects();
  return all.slice(0, limit);
}

export async function getProjectsByService(serviceId: number, limit = 3) {
  return db.query.projectsTable.findMany({
    where: eq(projectsTable.serviceId, serviceId),
    orderBy: asc(projectsTable.displayOrder),
    with: { city: { with: { district: true } } },
    limit,
  });
}

export async function getProjectsByCity(cityId: number, excludeSlug?: string) {
  const rows = await db.query.projectsTable.findMany({
    where: eq(projectsTable.cityId, cityId),
    with: { service: true },
  });
  return excludeSlug ? rows.filter((p) => p.slug !== excludeSlug) : rows;
}

export async function getRelatedProjects(currentSlug: string, serviceId: number | null, limit = 3) {
  const all = await getProjects();
  const related = all.filter((p) => p.slug !== currentSlug && (serviceId ? p.serviceId === serviceId : true));
  return (related.length ? related : all.filter((p) => p.slug !== currentSlug)).slice(0, limit);
}

export function getGalleryItems() {
  return db.query.galleryItemsTable.findMany({
    orderBy: asc(galleryItemsTable.displayOrder),
    with: { project: true },
  });
}

export function getReviews() {
  return db.query.reviewsTable.findMany({ orderBy: desc(reviewsTable.createdAt) });
}

export async function getReviewsByDistrict(districtId: number) {
  return db.query.reviewsTable.findMany({ where: eq(reviewsTable.districtId, districtId) });
}

export function getFaqs() {
  return db.query.faqsTable.findMany({ orderBy: asc(faqsTable.displayOrder) });
}

export async function getFaqsByCategory(category: (typeof faqsTable.$inferSelect)["category"]) {
  return db.query.faqsTable.findMany({ where: eq(faqsTable.category, category), orderBy: asc(faqsTable.displayOrder) });
}

export async function getFaqsForService(serviceSlug: string) {
  return db.query.faqsTable.findMany({
    where: and(eq(faqsTable.category, "service"), eq(faqsTable.serviceSlug, serviceSlug)),
    orderBy: asc(faqsTable.displayOrder),
  });
}

export async function getFaqsForDistrict(districtSlug: string) {
  return db.query.faqsTable.findMany({
    where: and(eq(faqsTable.category, "district"), eq(faqsTable.districtSlug, districtSlug)),
    orderBy: asc(faqsTable.displayOrder),
  });
}

export function getBlogPosts() {
  return db.query.blogPostsTable.findMany({
    orderBy: desc(blogPostsTable.publishedAt),
    with: { district: true },
  });
}

export async function getBlogPostBySlug(slug: string) {
  return db.query.blogPostsTable.findFirst({
    where: eq(blogPostsTable.slug, slug),
    with: { district: true },
  });
}

export async function getRelatedBlogPosts(currentSlug: string, serviceSlug?: string, limit = 2) {
  const all = await getBlogPosts();
  const others = all.filter((p) => p.slug !== currentSlug);
  if (serviceSlug) {
    const tagged = others.filter((p) => p.serviceTags.includes(serviceSlug));
    if (tagged.length) return tagged.slice(0, limit);
  }
  return others.slice(0, limit);
}

export async function getFeaturedBlogPosts(limit = 3) {
  const all = await getBlogPosts();
  return all.slice(0, limit);
}
