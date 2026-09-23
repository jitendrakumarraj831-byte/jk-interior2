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
// dist/public/<route>.html (dist/public/index.html for "/"). vercel.json sets
// `cleanUrls: true`, so Vercel serves /about from about.html and 308s
// /about.html to /about; any URL with no matching file gets 404.html with a
// real 404 status.
//
// The client-side app is untouched: main.tsx still calls createRoot(...).
// React mounts over the static markup exactly as it does today (a fast,
// content-full first paint instead of a blank shell), then renders
// normally — this is a static-snapshot technique, not full SSR/hydration,
// so there is no hydration-mismatch risk to the interactive app.
//
// Fail-hard by design: every indexed page and the 404 page exist ONLY as the
// files this script writes (vercel.json has no SPA fallback), so a build
// that could not prerender every route would deploy a site whose pages all
// 404. If a headless browser can't be launched, or any route fails after
// retries, the script exits non-zero and the deployment fails instead.
//
// Run with: pnpm run prerender (wired in as a `postbuild` step)

import { existsSync, readFileSync } from "node:fs"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { preview, type PreviewServer } from "vite"
import puppeteer, { type Browser } from "puppeteer-core"
import { getAllRoutes, NON_INDEXED_PRERENDER_ROUTES } from "./routes"

/** A route to crawl and the file (relative to dist/public) its HTML is written to. */
interface PrerenderTarget {
  path: string
  outFile: string
}

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
]
/** Marks the SEO tags this script writes into the static HTML so the app can retire them once
 *  react-helmet-async has put its own in place. Must stay identical to the constant of the same
 *  name in src/main.tsx. */
const PRERENDERED_TAG_ATTR = "data-jk-prerendered"

const NAV_TIMEOUT_MS = 30_000
const MAX_ATTEMPTS = 3

/** Identifies which build produced a page, stamped into every prerendered file. */
const BUILD_STAMP = new Date().toISOString()

/** Inserts the build stamp immediately after the doctype, so View Source on any
 *  deployed page shows whether that page is static HTML and which build made it. */
function stampPrerendered(html: string): string {
  return html.replace(/^(\s*<!DOCTYPE[^>]*>)/i, `$1\n<!-- prerendered ${BUILD_STAMP} -->`)
}

/** A summary line that survives skimming a long Vercel build log.
 *  Grep the build log for "[prerender] RESULT" to see how many routes were
 *  written, or why the build was failed. */
function banner(status: "PRERENDERED" | "FAILED", detail: string) {
  const line = "=".repeat(64)
  console.log(`\n${line}\n[prerender] RESULT: ${status} — ${detail}\n${line}\n`)
}

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

/** Logged once per run: the first thing worth knowing when diagnosing a FAILED
 *  build is which Chromium was even attempted. crawlRoutes() relaunches per
 *  retry attempt, so this is deduplicated to keep the build log readable. */
let loggedBrowserChoice = ""
function logBrowserChoice(choice: string) {
  if (choice === loggedBrowserChoice) return
  loggedBrowserChoice = choice
  console.log(`[prerender] using ${choice}`)
}

/** Reads a key from /etc/os-release, or "" when unavailable (non-Linux, missing file). */
function osRelease(key: string): string {
  try {
    const match = readFileSync("/etc/os-release", "utf-8").match(new RegExp(`^${key}="?([^"\\n]*)"?$`, "m"))
    return match?.[1] ?? ""
  } catch {
    return ""
  }
}

/**
 * @sparticuz/chromium only unpacks the shared libraries its Chromium needs
 * (libnss3, libnspr4, … in al2023.tar.br / al2.tar.br) and points
 * LD_LIBRARY_PATH at them when it detects AWS Lambda via AWS_EXECUTION_ENV or
 * AWS_LAMBDA_JS_RUNTIME. Vercel's build container is the same Amazon Linux
 * image but sets neither, so the libraries were never extracted and Chromium
 * died on launch ("libnss3.so: cannot open shared object file") — which is
 * why the prerender step was skipped on Vercel while working locally.
 *
 * The package reads these variables once, at import time, so this must run
 * before the dynamic import below. An explicitly set value is left alone.
 */
function prepareSparticuzForAmazonLinux() {
  if (process.env.AWS_EXECUTION_ENV || process.env.AWS_LAMBDA_JS_RUNTIME) return
  if (osRelease("ID") !== "amzn") return
  const version = osRelease("VERSION_ID")
  // AL2023 → al2023.tar.br (the package keys this off a "22.x"/"20.x" runtime);
  // Amazon Linux 2 → al2.tar.br (any other nodejs runtime).
  process.env.AWS_LAMBDA_JS_RUNTIME = version === "2" ? "nodejs18.x" : "nodejs22.x"
  console.log(
    `[prerender] Amazon Linux ${version} build container detected — ` +
      `unpacking @sparticuz/chromium's bundled libraries (AWS_LAMBDA_JS_RUNTIME=${process.env.AWS_LAMBDA_JS_RUNTIME})`,
  )
}

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
      logBrowserChoice(`local Chromium at ${candidate}`)
      return puppeteer.launch({ executablePath: candidate, args: STABILITY_ARGS, headless: true })
    }
  }

  prepareSparticuzForAmazonLinux()
  const chromium = (await import("@sparticuz/chromium")).default
  const executablePath = await chromium.executablePath()
  logBrowserChoice(`bundled @sparticuz/chromium at ${executablePath}`)
  return puppeteer.launch({
    executablePath,
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
 *  Every surviving tag is then stamped with PRERENDERED_TAG_ATTR. That attribute is what lets
 *  the app clear these tags again once react-helmet-async has inserted its own live copies —
 *  see dropPrerenderedSeoTags() in src/main.tsx. Without it the deduped static tag and the
 *  Helmet tag both sit in the DOM after mount, so a JS-executing crawler reads two <title>s,
 *  two canonicals and two descriptions on every route (identical values, but duplicated).
 *  react-helmet-async cannot recognise the static tags on its own: it only reclaims tags it
 *  rendered itself, and it emits no marker of its own in this version.
 *
 *  Note: the callback body must not assign any function to a variable — esbuild (via tsx)
 *  rewrites those into `__name(fn, "...")` calls, and `__name` does not exist in the page
 *  context, so the evaluate would throw "__name is not defined". Keep the logic inline. */
async function dedupeSeoTags(page: Awaited<ReturnType<Browser["newPage"]>>, defaults: Record<string, string | null>) {
  await page.evaluate(
    (defaultsArg: Record<string, string | null>, selectors: string[], markerAttr: string) => {
      for (const sel of selectors) {
        const els = Array.from(document.querySelectorAll(sel))
        const defaultVal = defaultsArg[sel]
        if (els.length > 1) {
          const matchesDefault = els.filter(
            (el) =>
              defaultVal != null &&
              (sel === "title" ? el.textContent : (el.getAttribute("content") ?? el.getAttribute("href"))) === defaultVal,
          )
          const survivors = els.filter((el) => !matchesDefault.includes(el))
          const toRemove = survivors.length > 0 ? matchesDefault : matchesDefault.slice(1)
          toRemove.forEach((el) => el.remove())
        }
        document.querySelectorAll(sel).forEach((el) => el.setAttribute(markerAttr, "1"))
      }
      // JSON-LD blocks can legitimately be several per page, so they are not
      // collapsed — only marked, so main.tsx can retire them once Helmet has
      // inserted its own live copies (otherwise every schema block would be
      // in the DOM twice after the app mounts).
      document.head
        .querySelectorAll('script[type="application/ld+json"]')
        .forEach((el) => el.setAttribute(markerAttr, "1"))
    },
    defaults,
    HELMET_MANAGED_SELECTORS,
    PRERENDERED_TAG_ATTR,
  )
}

interface Rendered {
  target: PrerenderTarget
  html: string
}

/** Runs one crawl pass over `routes` with the given browser/concurrency. Any route that errors
 *  (page-level timeout, or the whole browser going away mid-crawl) is returned in `pending` so the
 *  caller can retry it — with a fresh browser and lower concurrency — instead of losing the page. */
async function crawlPass(
  browser: Browser,
  baseUrl: string,
  routes: PrerenderTarget[],
  concurrency: number,
  staticDefaults: Record<string, string | null>,
): Promise<{ done: Rendered[]; pending: PrerenderTarget[] }> {
  const done: Rendered[] = []
  const pending: PrerenderTarget[] = []

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
        done.push({ target: route, html })
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

// Every indexable route, written to <route>.html (index.html for "/") — Vercel's
// `cleanUrls` serves /about from about.html — plus the non-indexed ones with
// their own output files (admin.html, 404.html).
const TARGETS: PrerenderTarget[] = [
  ...getAllRoutes().map((r) => ({
    path: r.path,
    outFile: r.path === "/" ? "index.html" : `${r.path.replace(/^\//, "")}.html`,
  })),
  ...NON_INDEXED_PRERENDER_ROUTES,
]

async function crawlRoutes(baseUrl: string, staticDefaults: Record<string, string | null>) {
  let pending = [...TARGETS]
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
    console.warn("[prerender] could not launch a headless browser in this environment.")
    console.warn(err instanceof Error ? err.message : String(err))
    banner("FAILED", "no headless browser available — the route HTML files were not generated.")
    process.exit(1)
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

    for (const { target, html } of succeeded) {
      const outPath = path.join(DIST_DIR, target.outFile)
      await mkdir(path.dirname(outPath), { recursive: true })
      // Stamp each page so "was this actually prerendered, and by which
      // build?" is answerable from View Source alone. The
      // stamp goes *after* the doctype, never before it: content preceding
      // the doctype is a quirks-mode trigger in legacy parsers. If there is
      // somehow no doctype to anchor to, the page ships unstamped rather
      // than risk that.
      await writeFile(outPath, stampPrerendered(html), "utf-8")
    }

    console.log(`[prerender] wrote ${succeeded.length}/${total} static pages to dist/public`)
    if (failed.length) {
      console.warn(
        `[prerender] ${failed.length} route(s) failed and were left as client-rendered only: ${failed.join(", ")}`,
      )
    }
    // Belt and braces: confirm on disk that every target file really exists.
    const missing = TARGETS.filter((t) => !existsSync(path.join(DIST_DIR, t.outFile))).map((t) => t.outFile)
    if (failed.length || missing.length) {
      banner(
        "FAILED",
        `${succeeded.length}/${total} routes prerendered` + (missing.length ? `; missing files: ${missing.join(", ")}` : ""),
      )
      process.exitCode = 1
      return
    }
    banner("PRERENDERED", `${succeeded.length}/${total} routes are static HTML.`)
  } finally {
    await previewServer?.close().catch(() => {})
  }
}

main().catch((err) => {
  console.error(err)
  banner("FAILED", "unexpected error — the route HTML files were not generated.")
  process.exit(1)
})
