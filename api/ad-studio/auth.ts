// Private Ad Studio gate — Vercel Node.js serverless function.
//
// The studio is a local-only creative tool, but the route still must not be
// readable by the public. The key lives in the deployment environment as
// AD_STUDIO_PRIVATE_KEY and is never sent to the browser. A successful unlock
// returns a short-lived, HMAC-signed HttpOnly cookie; the page only ever knows
// "unlocked" or "locked".
//
// No Node built-ins are imported: global WebCrypto is available in the Vercel
// Node runtime and keeps this function dependency-free. `process` is declared
// locally, matching api/chat.ts and api/leads.ts.
declare const process: { env: Record<string, string | undefined> }

const COOKIE_NAME = "jk_ad_studio"
const SESSION_TTL_SECONDS = 8 * 60 * 60
const MAX_BODY_BYTES = 4_096
const MAX_KEY_LENGTH = 256
const FAILURE_WINDOW_MS = 15 * 60_000
const MAX_FAILURES = 6

const encoder = new TextEncoder()

function getSecret(): string {
  return (process.env.AD_STUDIO_PRIVATE_KEY || "").trim()
}

/** A separate secret is optional; rotating the private key also rotates sessions. */
function getSessionSecret(): string {
  return (process.env.AD_STUDIO_SESSION_SECRET || "").trim() || getSecret()
}

function webCrypto(): Crypto | null {
  const value = (globalThis as { crypto?: Crypto }).crypto
  return value && value.subtle ? value : null
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "")
}

/** Constant-time string comparison — used for signatures, never for the key itself. */
function safeEqual(a: string, b: string): boolean {
  const left = encoder.encode(a)
  const right = encoder.encode(b)
  let diff = left.length ^ right.length
  const length = Math.max(left.length, right.length)
  for (let i = 0; i < length; i++) diff |= (left[i] ?? 0) ^ (right[i] ?? 0)
  return diff === 0
}

function safeEqualBytes(a: Uint8Array, b: Uint8Array): boolean {
  let diff = a.length ^ b.length
  const length = Math.max(a.length, b.length)
  for (let i = 0; i < length; i++) diff |= (a[i] ?? 0) ^ (b[i] ?? 0)
  return diff === 0
}

async function sign(value: string): Promise<string> {
  const c = webCrypto()
  if (!c) throw new Error("WebCrypto is unavailable")
  const key = await c.subtle.importKey(
    "raw",
    encoder.encode(getSessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
  const signature = await c.subtle.sign("HMAC", key, encoder.encode(value))
  return toBase64Url(new Uint8Array(signature))
}

async function createSessionToken(): Promise<string> {
  const c = webCrypto()
  if (!c) throw new Error("WebCrypto is unavailable")
  const expires = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  const nonceBytes = new Uint8Array(16)
  c.getRandomValues(nonceBytes)
  const payload = `v1.${expires}.${toBase64Url(nonceBytes)}`
  return `${payload}.${await sign(payload)}`
}

async function isValidSession(token: string | null): Promise<boolean> {
  if (!token) return false
  const parts = token.split(".")
  if (parts.length !== 4 || parts[0] !== "v1") return false
  const expires = Number(parts[1])
  const now = Math.floor(Date.now() / 1000)
  if (
    !Number.isFinite(expires) ||
    expires <= now ||
    expires > now + SESSION_TTL_SECONDS + 60
  )
    return false
  const expected = await sign(`${parts[0]}.${parts[1]}.${parts[2]}`)
  return safeEqual(parts[3], expected)
}

/**
 * Hashes both values before comparing. That keeps the comparison constant-time
 * regardless of the submitted key's length, and means the plain key is never
 * the value held in the comparison buffer.
 */
async function keyMatches(input: string): Promise<boolean> {
  const c = webCrypto()
  if (!c) return false
  const [provided, expected] = await Promise.all([
    c.subtle.digest("SHA-256", encoder.encode(input)),
    c.subtle.digest("SHA-256", encoder.encode(getSecret())),
  ])
  return safeEqualBytes(new Uint8Array(provided), new Uint8Array(expected))
}

function readCookie(header: unknown): string | null {
  if (typeof header !== "string") return null
  for (const part of header.split(";")) {
    const index = part.indexOf("=")
    if (index < 0) continue
    if (part.slice(0, index).trim() !== COOKIE_NAME) continue
    try {
      return decodeURIComponent(part.slice(index + 1).trim())
    } catch {
      return null
    }
  }
  return null
}

function clientIp(req: any): string {
  const forwarded = req.headers?.["x-forwarded-for"]
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded
  return String(raw || req.headers?.["x-real-ip"] || "unknown")
    .split(",")[0]
    .trim()
}

// A warm lambda keeps this map in memory. It is a brute-force ceiling, not a
// distributed limiter — the same trade-off api/leads.ts and api/chat.ts make.
const failures = new Map<string, number[]>()

function recentFailures(ip: string): number[] {
  const now = Date.now()
  const recent = (failures.get(ip) ?? []).filter(
    (time) => now - time < FAILURE_WINDOW_MS,
  )
  failures.set(ip, recent)
  if (failures.size > 5_000) {
    for (const [key, times] of failures) {
      if (times.every((time) => now - time >= FAILURE_WINDOW_MS))
        failures.delete(key)
    }
  }
  return recent
}

function isBlocked(ip: string): boolean {
  return recentFailures(ip).length >= MAX_FAILURES
}

function recordFailure(ip: string): void {
  recentFailures(ip).push(Date.now())
}

function clearFailures(ip: string): void {
  failures.delete(ip)
}

function isHttps(req: any): boolean {
  const proto = String(req.headers?.["x-forwarded-proto"] || "")
    .split(",")[0]
    .trim()
  return proto === "https" || Boolean(process.env.VERCEL)
}

function cookieHeader(req: any, value: string, maxAgeSeconds: number): string {
  return [
    `${COOKIE_NAME}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${maxAgeSeconds}`,
    ...(isHttps(req) ? ["Secure"] : []),
  ].join("; ")
}

function setNoStore(res: any): void {
  res.setHeader("Cache-Control", "no-store, max-age=0")
  res.setHeader("Pragma", "no-cache")
  res.setHeader("X-Robots-Tag", "noindex, nofollow")
  res.setHeader("Referrer-Policy", "no-referrer")
}

class BodyTooLarge extends Error {}

async function readJsonBody(req: any): Promise<any> {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === "object" && !(req.body instanceof Uint8Array))
      return req.body
    const text =
      typeof req.body === "string"
        ? req.body
        : new TextDecoder().decode(req.body)
    if (text.length > MAX_BODY_BYTES) throw new BodyTooLarge()
    try {
      return JSON.parse(text)
    } catch {
      return {}
    }
  }

  let raw = ""
  for await (const chunk of req) {
    raw += typeof chunk === "string" ? chunk : new TextDecoder().decode(chunk)
    if (raw.length > MAX_BODY_BYTES) throw new BodyTooLarge()
  }
  try {
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export default async function handler(req: any, res: any) {
  setNoStore(res)

  if (!getSecret()) {
    res.status(503).json({
      ok: false,
      unlocked: false,
      error:
        "Studio access is not configured on the server. Set AD_STUDIO_PRIVATE_KEY in Vercel.",
    })
    return
  }

  const method = String(req.method || "GET").toUpperCase()
  const ip = clientIp(req)

  try {
    if (method === "GET") {
      const unlocked = await isValidSession(readCookie(req.headers?.cookie))
      res.status(200).json({ ok: true, unlocked })
      return
    }

    if (method === "POST") {
      if (isBlocked(ip)) {
        res.status(429).json({
          ok: false,
          unlocked: false,
          error: "Too many attempts. Try again in a few minutes.",
        })
        return
      }

      let body: any
      try {
        body = await readJsonBody(req)
      } catch (err) {
        if (err instanceof BodyTooLarge) {
          res
            .status(413)
            .json({ ok: false, unlocked: false, error: "Request too large." })
          return
        }
        throw err
      }

      const key = typeof body?.key === "string" ? body.key.trim() : ""
      if (!key || key.length > MAX_KEY_LENGTH) {
        recordFailure(ip)
        res.status(401).json({
          ok: false,
          unlocked: false,
          error: "Incorrect private key.",
        })
        return
      }

      if (!(await keyMatches(key))) {
        recordFailure(ip)
        res.status(401).json({
          ok: false,
          unlocked: false,
          error: "Incorrect private key.",
        })
        return
      }

      clearFailures(ip)
      const token = await createSessionToken()
      res.setHeader("Set-Cookie", cookieHeader(req, token, SESSION_TTL_SECONDS))
      res.status(200).json({ ok: true, unlocked: true })
      return
    }

    if (method === "DELETE") {
      res.setHeader("Set-Cookie", cookieHeader(req, "", 0))
      res.status(200).json({ ok: true, unlocked: false })
      return
    }

    res.setHeader("Allow", "GET, POST, DELETE")
    res
      .status(405)
      .json({ ok: false, unlocked: false, error: "Method not allowed" })
  } catch (err) {
    // Never return the key, the session secret, or a stack trace.
    console.error("api/ad-studio/auth:", err)
    res.status(500).json({
      ok: false,
      unlocked: false,
      error: "Studio access is temporarily unavailable.",
    })
  }
}
