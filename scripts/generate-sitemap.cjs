const fs = require('fs')
const path = require('path')

const baseUrl = process.env.SITE_URL || 'https://www.jkinterior.online'
const pages = [
  '/',
  '/services',
  '/gallery',
  '/contact',
  '/faq',
  '/about',
]

const sitemapItems = pages.map((p) => {
  return `  <url><loc>${baseUrl}${p}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`
})

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapItems.join('\n')}\n</urlset>`

const outPath = path.join(__dirname, 'artifacts/jk-interior/public/sitemap.xml')
fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, sitemap, 'utf8')
console.log('Sitemap written to', outPath)
