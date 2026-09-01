import { PINTEREST_BOARD_URL } from "../artifacts/jk-interior/src/lib/pinterest-queries.js"

// Vercel Node.js serverless function — no framework, no extra deps (uses global fetch).
//
// Server-side proxy for JK Interior's own Pinterest board RSS feeds, used by
// the "Search Design Ideas" modal (see design-search.ts /
// design-search-modal.tsx) as its priority source of design photos. Pinterest
// does not send CORS headers on its RSS feeds, so the browser can't fetch one
// directly — this fetches server-side (where CORS doesn't apply) and returns
// a small, already-parsed JSON shape the modal can drop straight into its
// results grid.
//
// The `board` query param is checked against PINTEREST_BOARD_URL — the same
// fixed slug -> board-URL map the client uses to link to boards elsewhere on
// the site — and is never used to build an arbitrary outbound URL, so this
// can't become an open proxy for fetching whatever URL a caller supplies.

interface FeedItem {
  title: string
  link: string
  image: string
  width: number
  height: number
}

// In-memory per-board cache — a warm lambda serves many requests, and a
// Pinterest board's pins change at most a few times a week, so there is no
// reason to hit Pinterest more than once every 20 minutes even under bursty
// traffic on the search modal.
const CACHE_TTL_MS = 20 * 60_000
const cache = new Map<string, { items: FeedItem[]; expires: number }>()

function decodeEntities(html: string): string {
  return html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&amp;/g, "&")
}

function extractTag(xml: string, tag: string): string | null {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"))
  if (!match) return null
  const raw = match[1].trim()
  const cdata = raw.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/)
  return cdata ? cdata[1].trim() : raw
}

/**
 * Pinterest's CDN encodes the served width in the path for a resized image
 * (e.g. `https://i.pinimg.com/736x/aa/bb/cc/hash.jpg`); "originals" has no
 * size segment. Falls back to a typical Pinterest portrait pin ratio so the
 * client always has a sane `width`/`height` to render with, even though it's
 * an estimate rather than the pin's real dimensions.
 */
function estimateDimensions(imageUrl: string): { width: number; height: number } {
  const sizeMatch = imageUrl.match(/\/(\d+)x\//)
  const width = sizeMatch ? Number(sizeMatch[1]) : 736
  return { width, height: Math.round(width * 1.5) }
}

function parseRssItems(xml: string, max: number): FeedItem[] {
  const items: FeedItem[] = []
  const itemBlocks = xml.match(/<item[\s\S]*?<\/item>/gi) ?? []

  for (const block of itemBlocks) {
    if (items.length >= max) break
    const link = extractTag(block, "link")
    const description = extractTag(block, "description")
    if (!link || !description) continue

    // Pinterest's RSS puts the pin thumbnail as an <img> inside the
    // (HTML-escaped or CDATA-wrapped) <description>, not as a separate
    // <enclosure> or <media:content> element.
    const decoded = decodeEntities(description)
    const image = decoded.match(/<img[^>]+src="([^"]+)"/i)?.[1]
    if (!image) continue

    const title = extractTag(block, "title")
    items.push({
      title: title ? decodeEntities(title) : "Interior design idea from JK Interior's Pinterest",
      link,
      image,
      ...estimateDimensions(image),
    })
  }

  return items
}

async function fetchBoardFeed(boardSlug: string): Promise<FeedItem[]> {
  const cached = cache.get(boardSlug)
  if (cached && cached.expires > Date.now()) return cached.items

  const boardUrl = PINTEREST_BOARD_URL[boardSlug]
  if (!boardUrl) return []
  const rssUrl = `${boardUrl.replace(/\/$/, "")}.rss`

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 6000)
  try {
    const res = await fetch(rssUrl, {
      signal: controller.signal,
      headers: {
        // A bare fetch() user agent gets a different (often bot-blocked)
        // response from Pinterest than a browser does — this identifies the
        // request truthfully as a script, it just presents as one Pinterest's
        // edge is more likely to actually serve the RSS to. Pinterest's own
        // board RSS feeds are meant to be machine-read.
        "User-Agent": "Mozilla/5.0 (compatible; JKInteriorBot/1.0; +https://www.jkinterior.online)",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
    })
    if (!res.ok) return []
    const xml = await res.text()
    const items = parseRssItems(xml, 25)
    cache.set(boardSlug, { items, expires: Date.now() + CACHE_TTL_MS })
    return items
  } catch {
    // Network failure, timeout, or Pinterest blocking the request — the
    // client's fallback (local portfolio + Unsplash) takes over either way,
    // so this endpoint never needs to surface the specific cause.
    return []
  } finally {
    clearTimeout(timeout)
  }
}

// Rate limiting
//
// This endpoint fans out to Pinterest on a cache miss, so an open floodgate
// here is an open floodgate onto Pinterest's own servers too — same module-
// scope-Map approach as api/leads.ts and api/chat.ts (a per-warm-lambda
// ceiling, not a distributed limiter).
function makeLimiter(windowMs: number, max: number) {
  const hits = new Map<string, number[]>()
  return (key: string): boolean => {
    const now = Date.now()
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
    recent.push(now)
    hits.set(key, recent)
    if (hits.size > 5000) {
      for (const [k, times] of hits) {
        if (times.every((t) => now - t >= windowMs)) hits.delete(k)
      }
    }
    return recent.length > max
  }
}
const isRateLimited = makeLimiter(60_000, 30) // 30 requests/min/IP

function clientIp(req: any): string {
  const forwarded = req.headers?.["x-forwarded-for"]
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded
  return String(raw || req.headers?.["x-real-ip"] || "unknown").split(",")[0].trim()
}

function boardParam(req: any): string | undefined {
  if (typeof req.url !== "string") return undefined
  try {
    return new URL(req.url, "http://internal").searchParams.get("board") ?? undefined
  } catch {
    return undefined
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.status(405).json({ ok: false, error: "Method not allowed" })
    return
  }

  if (isRateLimited(clientIp(req))) {
    res.status(429).json({ ok: false, error: "Too many requests" })
    return
  }

  const board = boardParam(req)
  if (!board || !PINTEREST_BOARD_URL[board]) {
    res.status(400).json({ ok: false, error: "Unknown board" })
    return
  }

  try {
    const items = await fetchBoardFeed(board)
    res.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=1200")
    res.status(200).json({ ok: true, items })
  } catch (err) {
    console.error("api/pinterest-feed: failed", err)
    res.status(502).json({ ok: false, error: "Could not load Pinterest feed" })
  }
}
