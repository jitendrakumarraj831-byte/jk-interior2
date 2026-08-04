const fs = require('fs')
const path = require('path')

const publicDir = path.resolve(__dirname, 'artifacts/jk-interior/dist/public')
if (!fs.existsSync(publicDir)) {
  console.error('Build output directory not found:', publicDir)
  process.exit(1)
}

function walk(dir, files = []) {
  const list = fs.readdirSync(dir)
  list.forEach((f) => {
    const fp = path.join(dir, f)
    const stat = fs.statSync(fp)
    if (stat.isDirectory()) walk(fp, files)
    else files.push(fp)
  })
  return files
}

const files = walk(publicDir).filter((f) => f.endsWith('.html'))
const internalLinks = new Set()
files.forEach((f) => {
  const html = fs.readFileSync(f, 'utf8')
  const matches = html.match(/href=\"(\/[^\"]*)\"/g) || []
  matches.forEach((m) => {
    const href = m.slice(6, -1)
    if (href.startsWith('/')) internalLinks.add(href)
  })
})

const missing = []
internalLinks.forEach((link) => {
  const candidate = path.join(publicDir, link, 'index.html')
  const fileCandidate = path.join(publicDir, `${link.replace(/^\//, '')}.html`)
  if (!(fs.existsSync(candidate) || fs.existsSync(fileCandidate))) {
    missing.push(link)
  }
})

if (missing.length) {
  console.error('Broken internal links found:')
  missing.forEach((m) => console.error('  ', m))
  process.exit(2)
}
console.log('No broken internal links found.')
