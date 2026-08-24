// Regenerates public/sitemap.xml from the canonical route list in routes.ts,
// so every service, city, and service+city page that exists in the app is
// guaranteed to be listed with a correct <loc> and never drifts out of sync
// as services/cities are added. lastmod is stamped with the current build
// date for every run — accurate enough for crawl-freshness signalling
// without hand-maintaining 60+ per-page dates.
//
// Run with: pnpm run generate-sitemap (wired in as a `prebuild` step)

import { writeFile } from "node:fs/promises"
import path from "node:path"
import { getAllRoutes } from "./routes"

const SITE_URL = "https://www.jkinterior.online"
const OUT_FILE = path.resolve(import.meta.dirname, "../public/sitemap.xml")

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

async function main() {
  const routes = getAllRoutes()
  const lastmod = isoDate(new Date())

  const urlEntries = routes
    .map(
      (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
    )
    .join("\n\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

${urlEntries}
</urlset>
`

  await writeFile(OUT_FILE, xml, "utf-8")
  console.log(`[generate-sitemap] wrote ${routes.length} URLs to ${path.relative(process.cwd(), OUT_FILE)}`)
}

main().catch((err) => {
  console.error("[generate-sitemap] failed:", err)
  process.exit(1)
})
