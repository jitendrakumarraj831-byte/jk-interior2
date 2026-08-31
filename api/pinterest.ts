import { PINTEREST_BOARD_URL } from "../artifacts/jk-interior/src/lib/pinterest-queries.js"
import { pinterestBoardRssUrl, parsePinterestRss, type PinterestPin } from "../artifacts/jk-interior/src/lib/pinterest-rss.js"

// Vercel Node.js serverless function — no framework, no extra deps (uses global fetch),
// matching api/chat.ts and api/leads.ts.
//
// GET /api/pinterest?slug=<service-slug>
//   → { ok: true,  pins: [{ src, title, link }, …] }   feed read and parsed
//   → { ok: false, pins: [], reason }                  board missing, unreachable, or empty
//
// `reason` makes the failure diagnosable straight from a browser or curl —
// `curl "https://<site>/api/pinterest?slug=gypsum-ceiling"` says whether
// Pinterest refused the request, answered with an HTML page instead of a feed,
// or served a feed we could not find images in.
//
// The response is ALWAYS 200 with a `pins` array (a bad `slug` is the one
// exception). The gallery modal already renders our own local project photos
// instantly; these pins are a bonus layered on top, so every failure path here
// is designed to return an empty list rather than an error the client has to
// handle — no failure mode can take the gallery or its Lightbox down with it.

/** How long to wait on pinterest.com before giving up and returning no pins. */
const UPSTREAM_TIMEOUT_MS = 8_000

/** Refuse to read an absurdly large body into memory; a board feed is ~50-200 KB. */
const MAX_FEED_BYTES = 4 * 1024 * 1024

/**
 * Boards change rarely — a few pins a week at most — and every visitor who
 * opens a gallery modal hits this route, so results are cached hard. The CDN
 * (`s-maxage`) does the heavy lifting; the module-scope map below just spares
 * a warm lambda from re-fetching for its own lifetime.
 */
const CACHE_TTL_MS = 6 * 60 * 60 * 1000

/**
 * A failed fetch is cached too, but only briefly: if Pinterest is down or has
 * changed the feed format, we retry in minutes rather than wedging an empty
 * gallery in the CDN for six hours.
 */
const FAILURE_CACHE_TTL_MS = 10 * 60 * 1000

/** Why a read produced no pins, surfaced in the response and the logs. */
type FailureReason =
  | "no-board-for-slug"
  | "upstream-error"
  | "upstream-status"
  | "not-a-feed"
  | "no-pins-in-feed"

type CacheEntry = { at: number; ok: boolean; pins: PinterestPin[]; reason?: FailureReason }

/**
 * Module scope survives for the life of a warm lambda (same pattern as the
 * rate-limit bucket in api/chat.ts). Bounded by construction: only the eight
 * slugs in PINTEREST_BOARD_URL can ever be keys, so this cannot grow unbounded.
 */
const cache = new Map<string, CacheEntry>()

function cached(slug: string): CacheEntry | undefined {
  const entry = cache.get(slug)
  if (!entry) return undefined
  const ttl = entry.ok ? CACHE_TTL_MS : FAILURE_CACHE_TTL_MS
  if (Date.now() - entry.at > ttl) {
    cache.delete(slug)
    return undefined
  }
  return entry
}

/**
 * Reads one board's RSS feed.
 *
 * Pinterest serves the feed only to a request that looks like a real client —
 * a bare fetch with no User-Agent or Accept gets a 403 — hence the headers.
 * Every failure (network error, non-2xx, timeout, oversized body, an HTML
 * error page where XML was expected) resolves to an empty list; nothing throws
 * out of here.
 */
async function fetchBoardPins(rssUrl: string): Promise<{ pins: PinterestPin[]; reason?: FailureReason }> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)

  try {
    const res = await fetch(rssUrl, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        // Pinterest 403s an unidentified client. A descriptive UA with a
        // contact URL is the polite form and is what their feed accepts.
        "User-Agent": "Mozilla/5.0 (compatible; JKInteriorBot/1.0; +https://jkinterior.in/)",
        Accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
    })

    if (!res.ok) {
      console.error(`api/pinterest: ${rssUrl} responded ${res.status}`)
      return { pins: [], reason: "upstream-status" }
    }

    const length = Number(res.headers.get("content-length") ?? 0)
    if (length > MAX_FEED_BYTES) {
      console.error(`api/pinterest: ${rssUrl} body too large (${length} bytes)`)
      return { pins: [], reason: "upstream-error" }
    }

    const xml = await res.text()
    if (xml.length > MAX_FEED_BYTES) {
      console.error(`api/pinterest: ${rssUrl} body too large after read`)
      return { pins: [], reason: "upstream-error" }
    }

    // A board that was renamed or made private answers with an HTML page (or a
    // login redirect) at a 200. Parsing that yields nothing anyway, but saying
    // so in the log makes a broken slug obvious instead of silently empty.
    if (!/<rss[\s>]|<feed[\s>]/i.test(xml)) {
      console.error(`api/pinterest: ${rssUrl} did not return an RSS document`)
      return { pins: [], reason: "not-a-feed" }
    }

    const pins = parsePinterestRss(xml)
    if (!pins.length) {
      // A real feed we couldn't read images out of — the signal that Pinterest
      // has changed the shape of <item> and the parser needs revisiting.
      console.error(`api/pinterest: ${rssUrl} parsed to zero pins; the feed format may have changed`)
      return { pins, reason: "no-pins-in-feed" }
    }
    return { pins }
  } catch (err) {
    console.error(`api/pinterest: could not read ${rssUrl}`, err)
    return { pins: [], reason: "upstream-error" }
  } finally {
    clearTimeout(timer)
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD")
    res.status(405).json({ ok: false, error: "Method not allowed" })
    return
  }

  // Parsed off req.url rather than req.query so the route does not depend on
  // the platform having populated a parsed query object (api/chat.ts reads its
  // own ?stream=1 flag the same way). The base is a throwaway — only the path
  // and query of the incoming request matter.
  let slug = ""
  try {
    slug = new URL(req.url ?? "", "http://localhost").searchParams.get("slug") ?? ""
  } catch {
    slug = ""
  }

  // The slug is an allowlist lookup, never interpolated into the fetch URL —
  // this route can only ever reach the eight boards in PINTEREST_BOARD_URL, so
  // it can't be turned into an open proxy for arbitrary URLs.
  const boardUrl = slug ? PINTEREST_BOARD_URL[slug] : undefined
  const rssUrl = pinterestBoardRssUrl(boardUrl)

  if (!rssUrl) {
    // An unknown slug, or a slug whose board URL isn't a canonical board, is
    // not an error the visitor can act on — the modal just shows local photos.
    // Cached briefly so a crawler hammering bad slugs doesn't reach the lambda.
    res.setHeader("Cache-Control", "public, s-maxage=600")
    res.status(200).json({ ok: false, pins: [], reason: "no-board-for-slug" })
    return
  }

  let entry = cached(slug)
  if (!entry) {
    const { pins, reason } = await fetchBoardPins(rssUrl)
    // An empty list counts as a failure for caching purposes: a board really
    // does have pins, so nothing coming back means the read didn't work.
    entry = { at: Date.now(), ok: pins.length > 0, pins, reason }
    cache.set(slug, entry)
  }

  // Successful reads sit in the CDN for six hours and may be served stale for a
  // day while revalidating; a failure is held for ten minutes so a transient
  // Pinterest outage doesn't pin an empty gallery in the cache.
  res.setHeader(
    "Cache-Control",
    entry.ok
      ? "public, s-maxage=21600, stale-while-revalidate=86400"
      : "public, s-maxage=600"
  )
  res.status(200).json(entry.ok ? { ok: true, pins: entry.pins } : { ok: false, pins: [], reason: entry.reason })
}
