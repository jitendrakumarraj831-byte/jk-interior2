import { neon } from "@neondatabase/serverless"

// Vercel Node.js serverless function for the chat widget's leads.
//
// Until this file existed, fetch("/api/leads", ...) in jk-chat.tsx had nowhere
// to land — the route simply didn't exist, so every lead the assistant
// collected only ever reached localStorage on that one visitor's browser, and
// the business had no way to see it unless the visitor themselves tapped the
// WhatsApp button. This gives leads a real home: a Postgres table, written to
// by the chat widget and read by AdminPage.tsx (/admin).
//
// Storage: connect a Postgres database to this Vercel project (Storage tab ->
// Postgres, backed by Neon) — that's the only setup needed; whichever of
// DATABASE_URL / POSTGRES_URL Vercel injects is picked up automatically.
// (@vercel/postgres, the older package for this, is deprecated in favour of
// @neondatabase/serverless directly — see
// https://neon.com/docs/guides/vercel-postgres-transition-guide.) Also set
// ADMIN_KEY (any long random string) in the project's environment variables
// — that's the password /admin asks for.
//
// `process` is a Node.js runtime global; declared locally instead of pulling
// in @types/node, the same reasoning as api/chat.ts.
declare const process: { env: Record<string, string | undefined> }

const CONNECTION_STRING = process.env.DATABASE_URL || process.env.POSTGRES_URL
const sql = CONNECTION_STRING ? neon(CONNECTION_STRING) : null

/** Throws (not returns null) so every call site's existing try/catch handles a missing connection the same way it handles a real query failure. */
function getSql() {
  if (!sql) throw new Error("DATABASE_URL / POSTGRES_URL not set — connect a Postgres database in the Vercel project's Storage tab")
  return sql
}

// Rate limiting
//
// Two separate buckets: one for anyone posting a lead (this endpoint is open
// to the internet — every visitor's browser calls it), one for admin auth
// attempts (a wrong x-admin-key shouldn't be retryable at will). Module-scope
// Maps survive for the life of a warm lambda — a cost/abuse ceiling, not a
// distributed limiter, same trade-off api/chat.ts makes for the same reason.

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

const isLeadRateLimited = makeLimiter(10 * 60_000, 8) // 8 lead submissions per 10 min per IP

/**
 * Separate from makeLimiter above: this one must only count FAILED admin-key
 * attempts, not every request. A single combined "record and check" call (the
 * makeLimiter shape) was recording a hit on every GET/PATCH regardless of
 * whether the key was right — so loading the dashboard once, then clicking
 * "Mark all read" on five-plus unread leads, burned through the whole 5-hit
 * budget on correctly-authenticated requests and 429'd the admin out of their
 * own dashboard for 15 minutes. `isBlocked` only reads the current count;
 * `recordFailure` is the one call site that adds to it, and it only runs
 * after a key has already been checked and found wrong.
 */
function makeFailureLimiter(windowMs: number, max: number) {
  const hits = new Map<string, number[]>()
  function pruned(key: string): number[] {
    const now = Date.now()
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
    hits.set(key, recent)
    if (hits.size > 5000) {
      for (const [k, times] of hits) {
        if (times.every((t) => now - t >= windowMs)) hits.delete(k)
      }
    }
    return recent
  }
  return {
    isBlocked: (key: string): boolean => pruned(key).length >= max,
    recordFailure: (key: string): void => { pruned(key).push(Date.now()) },
  }
}

const authLimiter = makeFailureLimiter(15 * 60_000, 5) // 5 failed admin-key attempts per 15 min per IP

function clientIp(req: any): string {
  const forwarded = req.headers?.["x-forwarded-for"]
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded
  return String(raw || req.headers?.["x-real-ip"] || "unknown").split(",")[0].trim()
}

// Input handling

async function readBody(req: any): Promise<any> {
  if (req.body && typeof req.body === "object") return req.body
  if (typeof req.body === "string") {
    try { return JSON.parse(req.body) } catch { return {} }
  }
  let raw = ""
  for await (const chunk of req) raw += chunk
  try { return JSON.parse(raw) } catch { return {} }
}

/**
 * Collapses whitespace (including any newline or tab from pasted text) and
 * caps length. A lead field is display text on a page only the business
 * sees, not trusted input, and the SQL below is parameterized regardless —
 * this is about readability, not injection.
 */
function clean(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null
  const trimmed = value.replace(/\s+/g, " ").trim()
  return trimmed ? trimmed.slice(0, max) : null
}

// Table setup
//
// No separate migration tool for one table — CREATE TABLE IF NOT EXISTS is
// idempotent and cheap, and this only actually runs once per warm lambda
// thanks to the memoized promise below, not on every request.
let tableReady: Promise<void> | null = null
function ensureTable(): Promise<void> {
  if (tableReady) return tableReady
  const promise: Promise<void> = getSql()`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      city TEXT,
      service TEXT,
      estimate TEXT,
      preferred_time TEXT,
      chat_summary TEXT,
      is_read BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `.then(() => undefined)
  promise.catch(() => { tableReady = null }) // let a real failure be retried on the next request
  tableReady = promise
  return promise
}

// Admin auth

function isAuthorized(req: any): boolean {
  const key = req.headers?.["x-admin-key"]
  const expected = process.env.ADMIN_KEY
  return Boolean(expected) && key === expected
}

/**
 * Shared by GET and PATCH. Checks the failure-lockout status *before*
 * authorizing (so an IP that's already over budget can't use another attempt
 * to probe the key), but only records a new failure — via authLimiter.recordFailure —
 * once the key has actually been checked and found wrong. A correct key never
 * touches the limiter at all.
 */
function checkAdminAuth(req: any, ip: string): "ok" | "not-configured" | "blocked" | "unauthorized" {
  if (!process.env.ADMIN_KEY) return "not-configured"
  if (authLimiter.isBlocked(ip)) return "blocked"
  if (!isAuthorized(req)) {
    authLimiter.recordFailure(ip)
    return "unauthorized"
  }
  return "ok"
}

export default async function handler(req: any, res: any) {
  try {
    await ensureTable()
  } catch (err) {
    console.error("api/leads: could not reach the database", err)
    res.status(500).json({ ok: false, error: "Database not reachable" })
    return
  }

  if (req.method === "POST") {
    if (isLeadRateLimited(clientIp(req))) {
      res.status(429).json({ ok: false, error: "Too many requests" })
      return
    }
    const body = await readBody(req)
    const name = clean(body.name, 80)
    const phone = clean(body.phone, 20)
    if (!name || !phone) {
      res.status(400).json({ ok: false, error: "name and phone are required" })
      return
    }
    const city = clean(body.city, 80)
    const service = clean(body.service, 80)
    const estimate = clean(body.estimate, 120)
    const preferredTime = clean(body.preferred_time, 80)
    const chatSummary = clean(body.chat_summary, 800)

    try {
      await getSql()`
        INSERT INTO leads (name, phone, city, service, estimate, preferred_time, chat_summary)
        VALUES (${name}, ${phone}, ${city}, ${service}, ${estimate}, ${preferredTime}, ${chatSummary})
      `
      res.status(201).json({ ok: true })
    } catch (err) {
      console.error("api/leads: insert failed", err)
      res.status(500).json({ ok: false, error: "Could not save lead" })
    }
    return
  }

  if (req.method === "GET") {
    const auth = checkAdminAuth(req, clientIp(req))
    if (auth === "not-configured") {
      res.status(500).json({ ok: false, error: "Admin access not configured" })
      return
    }
    if (auth === "blocked") {
      res.status(429).json({ ok: false, error: "Too many attempts. Try again later." })
      return
    }
    if (auth === "unauthorized") {
      res.status(401).json({ ok: false, error: "Unauthorized" })
      return
    }
    try {
      // @neondatabase/serverless returns the rows directly (not wrapped in a
      // { rows } result object) unless fullResults is set — this is that
      // default shape.
      const rows = await getSql()`SELECT * FROM leads ORDER BY created_at DESC LIMIT 500`
      res.status(200).json({ ok: true, leads: rows })
    } catch (err) {
      console.error("api/leads: select failed", err)
      res.status(500).json({ ok: false, error: "Could not load leads" })
    }
    return
  }

  if (req.method === "PATCH") {
    const auth = checkAdminAuth(req, clientIp(req))
    if (auth === "not-configured") {
      res.status(500).json({ ok: false, error: "Admin access not configured" })
      return
    }
    if (auth === "blocked") {
      res.status(429).json({ ok: false, error: "Too many attempts. Try again later." })
      return
    }
    if (auth === "unauthorized") {
      res.status(401).json({ ok: false, error: "Unauthorized" })
      return
    }
    const body = await readBody(req)
    const id = Number(body.id)
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ ok: false, error: "Missing lead id" })
      return
    }
    try {
      await getSql()`UPDATE leads SET is_read = TRUE WHERE id = ${id}`
      res.status(200).json({ ok: true })
    } catch (err) {
      console.error("api/leads: update failed", err)
      res.status(500).json({ ok: false, error: "Could not update lead" })
    }
    return
  }

  res.status(405).json({ ok: false, error: "Method not allowed" })
}
