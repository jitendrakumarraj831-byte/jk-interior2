const fs = require('fs')
const path = require('path')

const publicDir = path.resolve(__dirname, '..', 'artifacts', 'jk-interior', 'dist', 'public')
if (!fs.existsSync(publicDir)) {
  console.log('Build output not found; skipping noindex check.')
  process.exit(0)
}

function walk(dir, files = []) {
  fs.readdirSync(dir).forEach((f) => {
    const fp = path.join(dir, f)
    const stat = fs.statSync(fp)
    if (stat.isDirectory()) walk(fp, files)
    else if (f.endsWith('.html')) files.push(fp)
  })
  return files
}
const htmlFiles = walk(publicDir)
const offenders = []
htmlFiles.forEach((f) => {
  const content = fs.readFileSync(f, 'utf8')
  if (/name=["']robots["'] content=["'].*noindex.*["']/i.test(content)) offenders.push(f)
})
if (offenders.length) {
  console.error('Found pages with noindex. Confirm these are intentional or remove robots noindex.')
  offenders.forEach((o) => console.error('  ', o))
  process.exit(2)
}
console.log('No accidental noindex directives found.')
