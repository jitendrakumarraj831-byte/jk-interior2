// Post-build static prerendering for every route in routes.ts.
//
// Why: this is a client-rendered Vite SPA — without this step, every route
// ships an (almost) empty <div id="root"> and relies on the crawler
// executing JavaScript to see any content. Googlebot can do that, but it
// costs render-budget and is a well-documented cause of "Crawled - currently
// not indexed" / "Discovered - currently not indexed" for exactly this
// shape of site. More importantly, most non-Google AI crawlers that power
// answer engines (GPTBot, ClaudeBot, PerplexityBot, etc.) do NOT execute
// JavaScript at all — they only ever see the raw HTML.
//
// This script boots the production build, visits every route in a headless
// browser, and writes the fully-rendered HTML (title, meta description,
// canonical, JSON-LD — everything react-helmet-async injects) to
// dist/public/<route>/index.html. Vercel's static file server resolves
// `/about` to `/about/index.html` automatically and — per Vercel's routing
// order — serves that static file instead of falling through to the SPA
// rewrite in vercel.json, so this requires no deploy config changes.
//
// The client-side app is untouched: main.tsx still calls createRoot(...).
// React mounts over the static markup exactly as it does today (a fast,
// content-full first paint instead of a blank shell), then renders
// normally — this is a static-snapshot technique, not full SSR/hydration,
// so there is no hydration-mismatch risk to the interactive app.
//
// Fail-soft by design: if a headless browser can't be launched in this
// build environment for any reason, the script logs a warning and exits 0
// rather than failing the build — worst case, the site simply ships as the
// plain client-rendered SPA it is today.
//
// Run with: pnpm run prerender (wired in as a `postbuild` step)

import { existsSync } from "node:fs"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { preview, type PreviewServer } from "vite"
import puppeteer, { type Browser } from "puppeteer-core"
import { getAllRoutes, type RouteEntry } from "./routes"

const ROOT_DIR = path.resolve(import.meta.dirname, "..")
const DIST_DIR = path.resolve(ROOT_DIR, "dist/public")
const DEFAULT_CONCURRENCY = 3

// Every tag SeoHead (src/components/seo-head.tsx) renders via react-helmet-async.
// index.html also hardcodes a generic version of most of these — a deliberate
// fallback for the moment before JS mounts. react-helmet-async only tracks and
// replaces tags *it* previously rendered, so on a JS-mounted page it inserts its
// route-specific versions ALONGSIDE the static ones rather than replacing them,
// leaving two <title>/<meta> elements for the same field. That's invisible in a
// live browser (the DOM's first title wins the tab, and most engines take the
// first meta of a given name) but becomes a literal artifact in the static HTML
// this script writes — so it's collapsed to one tag per field below, keeping
// whichever value differs from the generic index.html default (or the first
// copy, if a route's content happens to equal the default, e.g. the homepage).
const HELMET_MANAGED_SELECTORS = [
  "title",
  'meta[name="description"]',
  'meta[name="robots"]',
  'link[rel="canonical"]',
  'meta[property="og:title"]',
  'meta[property="og:description"]',
  'meta[property="og:type"]',
  'meta[property="og:url"]',
  'meta[property="og:image"]',
  'meta[property="og:image:width"]',
  'meta[property="og:image:height"]',
  'meta[property="og:locale"]',
  'meta[property="og:site_name"]',
  'meta[name="twitter:card"]',
  'meta[name="twitter:title"]',
  'meta[name="twitter:description"]',
  'meta[name="twitter:image"]',
  'meta[name="format-detection"]',
  'meta[name="apple-mobile-web-app-capable"]',
  'meta[name="apple-mobile-web-app-status-bar-style"]',
]
const NAV_TIMEOUT_MS = 30_000
const MAX_ATTEMPTS = 3

const STABILITY_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  // Constrained containers (this sandbox included) often mount a tiny
  // /dev/shm, which crashes Chromium's renderer process under any real
  // concurrency unless it's told to use /tmp instead.
  "--disable-dev-shm-usage",
  "--disable-gpu",
  "--disable-software-rasterizer",
]

async function launchBrowser(): Promise<Browser> {
  // 1) Explicit override, for any environment that wants full control.
  // 2) The Chromium this sandbox/dev environment ships pre-installed.
  // 3) @sparticuz/chromium — a Chromium build specifically packaged to run
  //    inside constrained Lambda-like build containers (e.g. Vercel's),
  //    which typically lack the shared libraries a stock Chromium download
  //    needs.
  const localCandidates = [process.env.PRERENDER_CHROMIUM_PATH, "/opt/pw-browsers/chromium"].filter(
    (p): p is string => !!p,
  )

  for (const candidate of localCandidates) {
    if (existsSync(candidate)) {
      return puppeteer.launch({ executablePath: candidate, args: STABILITY_ARGS, headless: true })
    }
  }

  const chromium = (await import("@sparticuz/chromium")).default
  return puppeteer.launch({
    executablePath: await chromium.executablePath(),
    args: [...chromium.args, ...STABILITY_ARGS],
    headless: chromium.headless,
  })
}

/** Reads the value each HELMET_MANAGED_SELECTORS tag has in the pristine, un-prerendered
 *  dist/public/index.html — i.e. the generic default a route's Helmet-rendered tag either
 *  matches (home) or overrides (everywhere else). Parsed via DOMParser inside a throwaway
 *  page so entities decode exactly the way the live DOM will present them for comparison. */
async function getStaticDefaults(browser: Browser, indexHtmlPath: string): Promise<Record<string, string | null>> {
  const html = await readFile(indexHtmlPath, "utf-8")
  const page = await browser.newPage()
  try {
    return await page.evaluate(
      (rawHtml: string, selectors: string[]) => {
        const doc = new DOMParser().parseFromString(rawHtml, "text/html")
        const out: Record<string, string | null> = {}
        for (const sel of selectors) {
          const el = doc.querySelector(sel)
          out[sel] = el ? (sel === "title" ? el.textContent : (el.getAttribute("content") ?? el.getAttribute("href"))) : null
        }
        return out
      },
      html,
      HELMET_MANAGED_SELECTORS,
    )
  } finally {
    await page.close().catch(() => {})
  }
}

/** Collapses each HELMET_MANAGED_SELECTORS field down to one tag, preferring the value that
 *  differs from `defaults` (the route-specific Helmet tag) over the generic static one.
 *
 *  Note: the callback body must not assign any function to a variable — esbuild (via tsx)
 *  rewrites those into `__name(fn, "...")` calls, and `__name` does not exist in the page
 *  context, so the evaluate would throw "__name is not defined". Keep the logic inline. */
async function dedupeSeoTags(page: Awaited<ReturnType<Browser["newPage"]>>, defaults: Record<string, string | null>) {
  await page.evaluate(
    (defaultsArg: Record<string, string | null>, selectors: string[]) => {
      for (const sel of selectors) {
        const els = Array.from(document.querySelectorAll(sel))
        if (els.length <= 1) continue
        const defaultVal = defaultsArg[sel]
        const matchesDefault = els.filter(
          (el) =>
            defaultVal != null &&
            (sel === "title" ? el.textContent : (el.getAttribute("content") ?? el.getAttribute("href"))) === defaultVal,
        )
        const survivors = els.filter((el) => !matchesDefault.includes(el))
        const toRemove = survivors.length > 0 ? matchesDefault : matchesDefault.slice(1)
        toRemove.forEach((el) => el.remove())
      }
    },
    defaults,
    HELMET_MANAGED_SELECTORS,
  )
}

interface Rendered {
  route: string
  html: string
}

/** Runs one crawl pass over `routes` with the given browser/concurrency. Any route that errors
 *  (page-level timeout, or the whole browser going away mid-crawl) is returned in `pending` so the
 *  caller can retry it — with a fresh browser and lower concurrency — instead of losing the page. */
async function crawlPass(
  browser: Browser,
  baseUrl: string,
  routes: RouteEntry[],
  concurrency: number,
  staticDefaults: Record<string, string | null>,
): Promise<{ done: Rendered[]; pending: RouteEntry[] }> {
  const done: Rendered[] = []
  const pending: RouteEntry[] = []

  let cursor = 0
  async function worker() {
    while (cursor < routes.length) {
      const route = routes[cursor++]
      if (!browser.connected) {
        pending.push(route)
        continue
      }
      let page: Awaited<ReturnType<Browser["newPage"]>> | undefined
      try {
        page = await browser.newPage()
        // Freezes framer-motion (MotionConfig reducedMotion="user" in
        // App.tsx honours this) so the snapshot captures the settled final
        // state of every section instead of a mid-fade-in frame.
        await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }])
        await page.setViewport({ width: 1366, height: 900 })
        await page.goto(`${baseUrl}${route.path}`, { waitUntil: "networkidle0", timeout: NAV_TIMEOUT_MS })
        // Every real page ends in <Footer /> — waiting for it confirms the
        // route resolved and the full component tree (incl. lazy chunks)
        // has painted, not just the initial shell.
        await page.waitForSelector("footer", { timeout: 10_000 }).catch(() => {})
        // Small grace period for react-helmet-async's effect to flush head
        // tags (title/canonical/JSON-LD) after the route body settles.
        await new Promise((resolve) => setTimeout(resolve, 200))
        await dedupeSeoTags(page, staticDefaults)
        const html = await page.content()
        done.push({ route: route.path, html })
        console.log(`[prerender] ✓ ${route.path}`)
      } catch (err) {
        pending.push(route)
        console.warn(`[prerender] ✗ ${route.path} (will retry): ${(err as Error).message}`)
      } finally {
        await page?.close().catch(() => {})
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, routes.length) }, () => worker()))
  return { done, pending }
}

async function crawlRoutes(baseUrl: string, staticDefaults: Record<string, string | null>) {
  let pending = getAllRoutes()
  const total = pending.length
  const succeeded: Rendered[] = []
  let concurrency = DEFAULT_CONCURRENCY

  for (let attempt = 1; attempt <= MAX_ATTEMPTS && pending.length > 0; attempt++) {
    if (attempt > 1) {
      console.log(`[prerender] retrying ${pending.length} route(s), attempt ${attempt}/${MAX_ATTEMPTS} (concurrency ${concurrency})`)
    }
    const browser = await launchBrowser()
    try {
      const { done, pending: stillPending } = await crawlPass(browser, baseUrl, pending, concurrency, staticDefaults)
      succeeded.push(...done)
      pending = stillPending
    } finally {
      await browser.close().catch(() => {})
    }
    concurrency = 1 // back off hard on retries — favour reliability over speed
  }

  return { succeeded, failed: pending.map((r) => r.path), total }
}

async function main() {
  if (!existsSync(DIST_DIR)) {
    console.error(`[prerender] dist dir not found at ${DIST_DIR} — run "vite build" first.`)
    process.exit(1)
  }

  // One up-front launch just to fail fast (and fail soft) if no browser can
  // run at all in this environment, and to read the generic default value of
  // every Helmet-managed tag from the pristine, un-prerendered index.html
  // (see dedupeSeoTags) before anything overwrites it. crawlRoutes() launches
  // its own browser per attempt from here on.
  let staticDefaults: Record<string, string | null>
  try {
    const probe = await launchBrowser()
    try {
      staticDefaults = await getStaticDefaults(probe, path.join(DIST_DIR, "index.html"))
    } finally {
      await probe.close().catch(() => {})
    }
  } catch (err) {
    console.warn("[prerender] could not launch a headless browser in this environment — skipping static")
    console.warn("[prerender] prerendering. The site will still deploy as a client-rendered SPA (unchanged).")
    console.warn(err instanceof Error ? err.message : String(err))
    process.exit(0)
  }

  let previewServer: PreviewServer | undefined
  try {
    previewServer = await preview({
      configFile: path.resolve(ROOT_DIR, "vite.config.ts"),
      preview: { port: 0, host: "127.0.0.1", strictPort: false },
      logLevel: "warn",
    })
    const baseUrl = previewServer.resolvedUrls?.local?.[0]?.replace(/\/$/, "")
    if (!baseUrl) throw new Error("could not determine preview server URL")
    console.log(`[prerender] serving production build at ${baseUrl}`)

    const { succeeded, failed, total } = await crawlRoutes(baseUrl, staticDefaults)

    for (const { route, html } of succeeded) {
      const outPath =
        route === "/" ? path.join(DIST_DIR, "index.html") : path.join(DIST_DIR, route.replace(/^\//, ""), "index.html")
      await mkdir(path.dirname(outPath), { recursive: true })
      await writeFile(outPath, html, "utf-8")
    }

    console.log(`[prerender] wrote ${succeeded.length}/${total} static pages to dist/public`)
    if (failed.length) {
      console.warn(
        `[prerender] ${failed.length} route(s) failed and were left as client-rendered only: ${failed.join(", ")}`,
      )
    }
  } finally {
    await previewServer?.close().catch(() => {})
  }
}

main().catch((err) => {
  console.error("[prerender] unexpected error — leaving dist as a client-rendered SPA.")
  console.error(err)
  process.exit(0)
})
