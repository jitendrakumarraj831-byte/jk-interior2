/**
 * Pinterest board RSS → pin image list.
 *
 * Pinterest publishes a public RSS feed for every public board at the board's
 * canonical URL with `.rss` appended:
 *
 *   https://www.pinterest.com/Jkinteriorfbg/gypsum-false-ceiling/
 *   https://www.pinterest.com/Jkinteriorfbg/gypsum-false-ceiling.rss
 *
 * This only works for a **canonical** board URL (`/user/board/`). A `pin.it`
 * shortlink has no `.rss` form — it's an opaque redirector — which is why the
 * board URLs in `pinterest-queries.ts` are all spelled out in full.
 *
 * The feed can only be read server-side: pinterest.com sends no CORS headers,
 * so a browser `fetch()` for it is blocked. `api/pinterest.ts` is the
 * serverless route that fetches it; everything in this file is pure string
 * work with no I/O and no dependencies, so both that route (Node, `nodenext`
 * resolution) and the browser bundle can import it, and it can be unit-tested
 * against a saved feed without touching the network.
 */

/** Every image URL we will render must be served by Pinterest's own CDN. */
const PIN_IMAGE_HOST = "i.pinimg.com"

/**
 * Pinterest serves each pin at a set of fixed widths under a size segment in
 * the path (`/236x/`, `/474x/`, `/564x/`, `/736x/`, `/originals/`). RSS hands
 * out the small 236px thumbnail, which is fine for a grid tile but visibly
 * soft once the Lightbox blows it up full-screen, so the size segment is
 * rewritten to 736px — the largest fixed width Pinterest generates for every
 * pin (`/originals/` is not always present, and 404s when it isn't).
 */
const PIN_IMAGE_WIDTH = "736x"

/** Matches the size segment in an `i.pinimg.com` path, e.g. `/236x/` or `/200x150/`. */
const PIN_SIZE_SEGMENT = /\/\d+x\d*\//

/** Upper bound on pins taken from one feed, so a large board can't flood the modal. */
const MAX_PINS_PER_BOARD = 24

/** One pin extracted from a board feed. */
export type PinterestPin = {
  /** Full-size image URL on `i.pinimg.com`. */
  src: string
  /** The pin's own title from the feed, cleaned of markup. May be empty. */
  title: string
  /** Permalink to the pin on Pinterest, for attribution. Empty when absent. */
  link: string
}

/**
 * Pinterest's own first-path-segment routes. A URL starting with one of these
 * is never a user's board, however much `/pin/12345/` resembles `/user/board/`.
 */
const RESERVED_PATH_PREFIXES = new Set([
  "pin",
  "search",
  "ideas",
  "today",
  "topics",
  "categories",
  "business",
  "settings",
  "news_hub",
  "discover",
])

/**
 * The `.rss` feed URL for a canonical Pinterest board URL.
 *
 * Returns `undefined` for anything that isn't a real pinterest.com board URL —
 * a `pin.it` shortlink, a search URL, a bare username, or junk — so a
 * mistyped or not-yet-created board is skipped rather than fetched blindly.
 */
export function pinterestBoardRssUrl(boardUrl: string | undefined): string | undefined {
  if (!boardUrl) return undefined

  let parsed: URL
  try {
    parsed = new URL(boardUrl)
  } catch {
    return undefined
  }

  // `pin.it` shortlinks and every other host are rejected here: only a
  // canonical www.pinterest.com board path has an `.rss` sibling.
  const host = parsed.hostname.toLowerCase()
  if (host !== "pinterest.com" && host !== "www.pinterest.com") return undefined

  // A board path is exactly two segments: /<user>/<board>/. One segment is a
  // profile, three or more is a pin or a section — neither has a board feed.
  const segments = parsed.pathname.split("/").filter(Boolean)
  if (segments.length !== 2) return undefined

  const [user, board] = segments
  // Several of Pinterest's own two-segment routes look exactly like
  // `/user/board/` but aren't one — `/pin/1234567/` and `/search/pins/` most
  // of all. Appending `.rss` to those returns an HTML page, not a feed.
  if (RESERVED_PATH_PREFIXES.has(user.toLowerCase())) return undefined
  // `/user/_saved/`, `/user/_created/` — a profile tab, not a board.
  if (board.startsWith("_")) return undefined

  return `https://www.pinterest.com/${user}/${board}.rss`
}

/**
 * Extracts the renderable pins from a Pinterest board RSS document.
 *
 * Deliberately regex-based rather than DOM/XML parsed: the API route runs on
 * bare Node with no XML parser available and no dependency budget (same
 * constraint as `api/chat.ts`), and the shape of an RSS `<item>` is narrow
 * enough to match directly. Anything that doesn't fit the expected shape is
 * dropped rather than guessed at, so a feed format change degrades to "no
 * pins" instead of rendering broken images.
 */
export function parsePinterestRss(xml: string): PinterestPin[] {
  if (!xml || typeof xml !== "string") return []

  const pins: PinterestPin[] = []
  const seen = new Set<string>()

  for (const item of xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? []) {
    const src = normalizePinImageUrl(extractImageUrl(item))
    if (!src || seen.has(src)) continue
    seen.add(src)

    pins.push({
      src,
      title: cleanText(tagContent(item, "title")),
      link: sanitizePinLink(cleanText(tagContent(item, "link"))),
    })

    if (pins.length >= MAX_PINS_PER_BOARD) break
  }

  return pins
}

/**
 * The pin image inside one `<item>`. Pinterest has shipped this in three
 * different places over the years, so all three are tried in quality order:
 * the Media RSS extension first (a real URL attribute), then `<enclosure>`,
 * then the `<img>` Pinterest embeds in the HTML blob inside `<description>`.
 */
function extractImageUrl(item: string): string | undefined {
  const media = item.match(/<media:(?:content|thumbnail)\b[^>]*\burl\s*=\s*["']([^"']+)["']/i)
  if (media) return decodeEntities(media[1])

  const enclosure = item.match(/<enclosure\b[^>]*\burl\s*=\s*["']([^"']+)["']/i)
  if (enclosure) return decodeEntities(enclosure[1])

  // The description is HTML inside CDATA (or entity-escaped), so it is decoded
  // before looking for the <img> — an escaped `&lt;img src=…&gt;` has to
  // become real markup first.
  const description = decodeEntities(stripCdata(tagContent(item, "description") ?? ""))
  const img = description.match(/<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/i)
  return img ? img[1] : undefined
}

/**
 * Validates a candidate image URL and rewrites it to the larger fixed width.
 *
 * The host check is the important half: the feed is third-party content, and
 * these URLs go straight into an `<img src>`. Restricting them to Pinterest's
 * own image CDN means a compromised or spoofed feed can't point the gallery at
 * an attacker's tracker or a `javascript:`/`data:` payload.
 */
function normalizePinImageUrl(raw: string | undefined): string | undefined {
  if (!raw) return undefined

  let parsed: URL
  try {
    parsed = new URL(raw.trim())
  } catch {
    return undefined
  }

  if (parsed.protocol !== "https:") return undefined
  const host = parsed.hostname.toLowerCase()
  if (host !== PIN_IMAGE_HOST) return undefined

  // `/236x/ab/cd/ef/hash.jpg` → `/736x/ab/cd/ef/hash.jpg`. A path with no size
  // segment (already `/originals/`, or an unexpected shape) is left untouched.
  parsed.pathname = parsed.pathname.replace(PIN_SIZE_SEGMENT, `/${PIN_IMAGE_WIDTH}/`)
  return parsed.toString()
}

/** A pin permalink, kept only if it really points at pinterest.com over https. */
function sanitizePinLink(raw: string): string {
  if (!raw) return ""
  try {
    const parsed = new URL(raw)
    if (parsed.protocol !== "https:") return ""
    const host = parsed.hostname.toLowerCase()
    if (host !== "pinterest.com" && !host.endsWith(".pinterest.com")) return ""
    return parsed.toString()
  } catch {
    return ""
  }
}

/** The raw inner text of the first `<tag>…</tag>` in a chunk of XML. */
function tagContent(xml: string, tag: string): string | undefined {
  const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"))
  return match ? match[1] : undefined
}

function stripCdata(value: string): string {
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
}

/** Feed text → plain text: CDATA unwrapped, markup dropped, entities decoded, whitespace collapsed. */
function cleanText(value: string | undefined): string {
  if (!value) return ""
  return decodeEntities(stripCdata(value).replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim()
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
}

/** `String.fromCodePoint` throws outside the Unicode range, so bad refs are left as written. */
function fromCodePoint(code: number, fallback: string): string {
  if (!Number.isInteger(code) || code < 0 || code > 0x10ffff) return fallback
  return String.fromCodePoint(code)
}

/**
 * Decodes the XML entities an RSS feed can carry. Runs twice because
 * Pinterest double-escapes the HTML it puts in `<description>` (`&amp;lt;img`),
 * so one pass leaves `&lt;img` behind.
 */
function decodeEntities(value: string): string {
  const once = (input: string) =>
    input.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity: string) => {
      const key = entity.toLowerCase()
      if (key in NAMED_ENTITIES) return NAMED_ENTITIES[key]
      if (key.startsWith("#x")) return fromCodePoint(Number.parseInt(entity.slice(2), 16), match)
      if (key.startsWith("#")) return fromCodePoint(Number.parseInt(entity.slice(1), 10), match)
      return match
    })

  return once(once(value))
}
