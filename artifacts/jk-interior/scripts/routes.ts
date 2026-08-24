// Single source of truth for every crawlable route on the site. Both
// generate-sitemap.ts and prerender.ts import this so the sitemap, the
// prerendered static HTML, and the actual React Router routes in src/App.tsx
// can never drift apart. Add a new service/city here (or better, add it to
// the underlying data file it reads from) and it is picked up everywhere.

import { CITIES } from "../src/lib/seo"
import { SERVICE_CITY_SERVICES } from "../src/lib/service-city-data"
import { SERVICES_CONTENT } from "../src/lib/services-content"

export interface RouteEntry {
  path: string
  priority: string
  changefreq: string
}

export function getAllRoutes(): RouteEntry[] {
  const routes: RouteEntry[] = [
    { path: "/", priority: "1.0", changefreq: "weekly" },
    { path: "/about", priority: "0.8", changefreq: "monthly" },
    { path: "/services", priority: "0.9", changefreq: "monthly" },
    { path: "/gallery", priority: "0.8", changefreq: "weekly" },
    { path: "/contact", priority: "0.8", changefreq: "monthly" },
    { path: "/faq", priority: "0.7", changefreq: "monthly" },
  ]

  for (const service of SERVICES_CONTENT) {
    routes.push({ path: `/services/${service.slug}`, priority: "0.85", changefreq: "monthly" })
  }

  for (const city of CITIES) {
    const isPrimary = city.slug === "forbesganj" || city.slug === "araria" || city.slug === "narpatganj"
    routes.push({ path: `/cities/${city.slug}`, priority: isPrimary ? "0.9" : "0.8", changefreq: "monthly" })
  }

  for (const service of SERVICE_CITY_SERVICES) {
    for (const city of CITIES) {
      routes.push({ path: `/services/${service.slug}/${city.slug}`, priority: "0.7", changefreq: "monthly" })
    }
  }

  return routes
}
