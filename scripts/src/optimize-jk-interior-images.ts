// One-off image pipeline for artifacts/jk-interior/public/images.
//
// What it fixes:
//   1. Every "*.avif" file there was a byte-identical copy of the matching
//      "*.webp" file (confirmed via md5sum) — not actually AVIF-encoded, so
//      AVIF-capable phones got zero compression benefit. This re-encodes a
//      real AVIF from each WebP source.
//   2. Gallery photos are up to 1200x1600px but only ever displayed in
//      ~300-420px cards (lightbox excepted). This also emits a capped-width
//      "-800w" variant (WebP + AVIF) for every image for card use via
//      srcset, so mobile devices stop downloading full desktop-resolution
//      photos for a thumbnail. Images already <=800px wide still get a
//      "-800w" pair (same pixel size, just re-encoded) so the gallery code
//      can reference one consistent naming scheme for every image.
//   3. The hero photo gets a "-750w" mobile variant for the same reason.
//
// Idempotent / resumable: an output file is skipped once it already exists,
// so killing and re-running only continues where it left off. Delete an
// output file (or the whole directory of "-800w"/"-750w" variants) to force
// it to be regenerated.
//
// Run with: pnpm --filter @workspace/scripts optimize-images

import { readdir, stat } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const IMAGES_DIR = path.resolve(
  import.meta.dirname,
  "../../artifacts/jk-interior/public/images",
)
const HERO_FILE = path.resolve(IMAGES_DIR, "hero-interior.webp")

const CARD_MAX_WIDTH = 800
// Common budget/mid-range Android phones run 360-430 CSS px wide at DPR
// 2-3 (e.g. a Redmi/Galaxy A-series at 393x873 DPR 2.75 needs ~1080px to
// stay crisp). 960w covers that range without shipping the full 1376w
// desktop-resolution photo to a phone.
const HERO_MOBILE_WIDTH = 960

const AVIF_OPTS: sharp.AvifOptions = { quality: 55, effort: 3 }
const WEBP_OPTS: sharp.WebpOptions = { quality: 78 }

async function exists(p: string): Promise<boolean> {
  try {
    await stat(p)
    return true
  } catch {
    return false
  }
}

async function fileSize(p: string): Promise<number> {
  try {
    return (await stat(p)).size
  } catch {
    return -1
  }
}

async function main() {
  const entries = await readdir(IMAGES_DIR)
  const sources = entries
    .filter((f) => f.endsWith(".webp") && !/-\d+w\.webp$/.test(f))
    .sort()

  for (const [i, file] of sources.entries()) {
    const webpPath = path.join(IMAGES_DIR, file)
    const avifPath = webpPath.replace(/\.webp$/, ".avif")
    const base = file.replace(/\.webp$/, "")
    const cardWebp = path.join(IMAGES_DIR, `${base}-${CARD_MAX_WIDTH}w.webp`)
    const cardAvif = path.join(IMAGES_DIR, `${base}-${CARD_MAX_WIDTH}w.avif`)

    // Skip if a real (not the old byte-identical-to-webp fake) AVIF is
    // already there from a previous, possibly interrupted, run.
    const avifIsReal = (await exists(avifPath)) && (await fileSize(avifPath)) !== (await fileSize(webpPath))
    if (!avifIsReal) {
      await sharp(webpPath).avif(AVIF_OPTS).toFile(avifPath)
    }

    if (!(await exists(cardWebp))) {
      await sharp(webpPath)
        .resize({ width: CARD_MAX_WIDTH, withoutEnlargement: true })
        .webp(WEBP_OPTS)
        .toFile(cardWebp)
    }
    if (!(await exists(cardAvif))) {
      await sharp(webpPath)
        .resize({ width: CARD_MAX_WIDTH, withoutEnlargement: true })
        .avif(AVIF_OPTS)
        .toFile(cardAvif)
    }

    console.log(`[${i + 1}/${sources.length}] ${file}`)
  }

  const heroBase = HERO_FILE.replace(/\.webp$/, "")
  const heroMobileWebp = `${heroBase}-${HERO_MOBILE_WIDTH}w.webp`
  const heroMobileAvif = `${heroBase}-${HERO_MOBILE_WIDTH}w.avif`
  if (!(await exists(heroMobileWebp))) {
    await sharp(HERO_FILE).resize({ width: HERO_MOBILE_WIDTH }).webp(WEBP_OPTS).toFile(heroMobileWebp)
  }
  if (!(await exists(heroMobileAvif))) {
    await sharp(HERO_FILE).resize({ width: HERO_MOBILE_WIDTH }).avif(AVIF_OPTS).toFile(heroMobileAvif)
  }

  console.log("All images processed.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
