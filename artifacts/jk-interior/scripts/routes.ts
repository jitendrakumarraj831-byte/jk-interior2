// Single source of truth for every crawlable, indexable route on the site.
// generate-sitemap.ts and prerender.ts both import this, so the sitemap, the
// prerendered static HTML and the routes in src/App.tsx cannot drift apart.
// Add a service or city to its data file and it is picked up everywhere.
//
// There are deliberately no service × city combinations here: those 80
// templated pages were retired and now 301 to their service page (vercel.json).

import { CITIES } from "../src/lib/seo"
import { SERVICES_CONTENT } from "../src/lib/services-content"

export interface RouteEntry {
  path: string
}

export function getAllRoutes(): RouteEntry[] {
  const routes: RouteEntry[] = [
    { path: "/" },
    { path: "/about" },
    { path: "/services" },
    { path: "/gallery" },
    { path: "/contact" },
    { path: "/faq" },
  ]
  for (const service of SERVICES_CONTENT) routes.push({ path: `/services/${service.slug}` })
  for (const city of CITIES) routes.push({ path: `/cities/${city.slug}` })
  return routes
}

/**
 * Routes that are prerendered to static HTML but are NOT crawlable and never go
 * in the sitemap: the noindex admin tool, and the 404 page (written to
 * /404.html, which Vercel serves with a 404 status for any unmatched URL).
 */
export const NON_INDEXED_PRERENDER_ROUTES: { path: string; outFile: string }[] = [
  { path: "/admin", outFile: "admin/index.html" },
  { path: "/__not-found__", outFile: "404.html" },
]
