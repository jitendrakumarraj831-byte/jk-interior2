import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getServices, getProjects, getDistricts, getCitiesByDistrictId, getBlogPosts } from "@/lib/queries";

const STATIC_ROUTES = [
  "",
  "/services",
  "/projects",
  "/gallery",
  "/blog",
  "/areas-we-serve",
  "/tools",
  "/tools/price-calculator",
  "/tools/material-calculator",
  "/tools/quotation-generator",
  "/tools/estimate-calculator",
  "/ai-assistant",
  "/about",
  "/contact",
  "/faq",
  "/reviews",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, projects, districts, blogPosts] = await Promise.all([getServices(), getProjects(), getDistricts(), getBlogPosts()]);

  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));

  for (const service of services) {
    entries.push({ url: `${SITE_URL}/services/${service.slug}`, changeFrequency: "monthly", priority: 0.8 });
  }
  for (const project of projects) {
    entries.push({ url: `${SITE_URL}/projects/${project.slug}`, changeFrequency: "monthly", priority: 0.6 });
  }
  for (const post of blogPosts) {
    entries.push({ url: `${SITE_URL}/blog/${post.slug}`, changeFrequency: "monthly", priority: 0.6 });
  }
  for (const district of districts) {
    entries.push({ url: `${SITE_URL}/areas-we-serve/${district.slug}`, changeFrequency: "monthly", priority: 0.8 });
    const cities = await getCitiesByDistrictId(district.id);
    for (const city of cities) {
      entries.push({ url: `${SITE_URL}/areas-we-serve/${district.slug}/${city.slug}`, changeFrequency: "monthly", priority: 0.7 });
    }
  }

  return entries;
}
