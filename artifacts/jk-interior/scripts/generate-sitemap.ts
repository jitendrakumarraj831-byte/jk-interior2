// Regenerates public/sitemap.xml from the canonical route list in routes.ts, so
// every indexable page that exists in the app is listed with its canonical
// <loc> and nothing else is — no redirects, no admin, no API, no 404.
//
// No <lastmod>: the build cannot know when each page's content last genuinely
// changed (stamping every URL with the build date on every deploy teaches
// Google to ignore the field). No <changefreq>/<priority>: Google ignores both.
//
// Run with: pnpm run generate-sitemap (wired in as the first build step)

import { writeFile } from "node:fs/promises"
import path from "node:path"
import { getAllRoutes } from "./routes"

const SITE_URL = "https://www.jkinterior.online"
const OUT_FILE = path.resolve(import.meta.dirname, "../public/sitemap.xml")

async function main() {
  const routes = getAllRoutes()
  const urlEntries = routes.map((r) => `  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n  </url>`).join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
