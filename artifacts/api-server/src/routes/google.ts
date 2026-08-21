import { Router, type Request, type Response } from "express";
import { google } from "googleapis";
import crypto from "node:crypto";
import { db } from "@workspace/db";
import { googleBusinessActivityTable, googleBusinessConnectionsTable } from "@workspace/db/schema";
import { desc, eq } from "drizzle-orm";

const router = Router();
const STATE_COOKIE = "gbp_oauth_state";
const SESSION_COOKIE = "gbp_admin_session";
const SCOPES = [
  "https://www.googleapis.com/auth/business.manage",
  "openid",
  "email",
];

function config() {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, GOOGLE_ALLOWED_EMAILS, GBP_TOKEN_ENCRYPTION_KEY } = process.env;
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI || !GOOGLE_ALLOWED_EMAILS || !GBP_TOKEN_ENCRYPTION_KEY) {
    throw new Error("GBP OAuth is not configured");
  }
  if (process.env.NODE_ENV === "production" && GOOGLE_REDIRECT_URI !== "https://www.jkinterior.online/api/google/oauth/callback") {
    throw new Error("GOOGLE_REDIRECT_URI must exactly match the production callback URL");
  }
  const key = Buffer.from(GBP_TOKEN_ENCRYPTION_KEY, "base64");
  if (key.length !== 32) throw new Error("GBP_TOKEN_ENCRYPTION_KEY must decode to exactly 32 bytes");
  return { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, allowed: GOOGLE_ALLOWED_EMAILS.split(",").map((email) => email.trim().toLowerCase()).filter(Boolean), encryptionKey: GBP_TOKEN_ENCRYPTION_KEY };
}

function oauthClient() {
  const c = config();
  return new google.auth.OAuth2(c.GOOGLE_CLIENT_ID, c.GOOGLE_CLIENT_SECRET, c.GOOGLE_REDIRECT_URI);
}

function sign(value: string) {
  const secret = config().encryptionKey;
  return crypto.createHmac("sha256", secret).update(value).digest("base64url");
}
function makeSession(email: string) { return `${email}.${sign(email)}`; }
function sessionEmail(req: Request) {
  const raw = req.headers.cookie?.split(";").map((v) => v.trim()).find((v) => v.startsWith(`${SESSION_COOKIE}=`))?.split("=")[1];
  if (!raw) return null;
  const [email, signature] = decodeURIComponent(raw).split(".");
  const expected = sign(email);
  if (!email || !signature || signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  return config().allowed.includes(email.toLowerCase()) ? email.toLowerCase() : null;
}
function cookie(name: string, value: string, maxAge: number) { return `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; HttpOnly; Secure; SameSite=Lax`; }
function clearCookie(name: string) { return `${name}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`; }
function apiError(error: unknown) {
  const status = (error as { response?: { status?: number } })?.response?.status;
  if (status === 401) return [401, "Google connection expired. Please reconnect."] as const;
  if (status === 403) return [403, "Required Google Business Profile API permission is not enabled."] as const;
  if (status === 404) return [404, "Business Profile location not found."] as const;
  if (status === 429) return [429, "Google API rate limit reached. Please try again later."] as const;
  return [502, "Google Business Profile is temporarily unavailable."] as const;
}
async function tokenFor(email: string) {
  const row = await db.query.googleBusinessConnectionsTable.findFirst({ where: eq(googleBusinessConnectionsTable.googleEmail, email) });
  if (!row) return null;
  const decipher = crypto.createDecipheriv("aes-256-gcm", Buffer.from(config().encryptionKey, "base64"), Buffer.from(row.refreshTokenEncrypted.slice(0, 32), "hex"));
  const payload = row.refreshTokenEncrypted.slice(32);
  const tag = Buffer.from(payload.slice(0, 32), "hex");
  decipher.setAuthTag(tag);
  const refreshToken = Buffer.concat([decipher.update(Buffer.from(payload.slice(32), "base64url")), decipher.final()]).toString();
  const client = oauthClient(); client.setCredentials({ refresh_token: refreshToken });
  return client;
}
function encrypt(value: string) {
  const iv = crypto.randomBytes(16); const cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(config().encryptionKey, "base64"), iv);
  const encrypted = Buffer.concat([cipher.update(value), cipher.final()]);
  return `${iv.toString("hex")}${cipher.getAuthTag().toString("hex")}${encrypted.toString("base64url")}`;
}
function requireAdmin(req: Request, res: Response) { const email = sessionEmail(req); if (!email) { res.status(401).json({ ok: false, error: "Unauthorized" }); return null; } return email; }

router.get("/google/auth", (req, res) => {
  if (!requireAdmin(req, res)) return;
  try {
    const state = crypto.randomBytes(32).toString("base64url");
    const url = oauthClient().generateAuthUrl({ access_type: "offline", prompt: "consent", scope: SCOPES, state });
    res.setHeader("Set-Cookie", cookie(STATE_COOKIE, `${state}.${sign(state)}`, 600));
    return res.redirect(url);
  } catch { return res.status(503).json({ ok: false, error: "Google OAuth is not configured." }); }
});

router.get("/google/oauth/callback", async (req, res) => {
  try {
    const stateCookie = req.headers.cookie?.split(";").map((v) => v.trim()).find((v) => v.startsWith(`${STATE_COOKIE}=`))?.split("=")[1];
    const state = typeof req.query.state === "string" ? req.query.state : "";
    const [saved, signature] = stateCookie ? decodeURIComponent(stateCookie).split(".") : [];
    if (!saved || saved !== state || !signature || signature !== sign(saved)) return res.status(400).send("Invalid OAuth state.");
    if (typeof req.query.code !== "string") return res.status(400).send("Google authorization was cancelled.");
    const client = oauthClient(); const { tokens } = await client.getToken(req.query.code); client.setCredentials(tokens);
    const profile = await google.oauth2({ version: "v2", auth: client }).userinfo.get();
    const email = profile.data.email?.toLowerCase(); const allowed = config().allowed;
    if (!email || !allowed.includes(email)) return res.status(403).send("This Google account is not authorized for JK Interior GBP Automation.");
    if (!tokens.refresh_token) return res.status(400).send("Google did not return a refresh token. Reconnect and approve offline access.");
    await db.insert(googleBusinessConnectionsTable).values({ googleEmail: email, refreshTokenEncrypted: encrypt(tokens.refresh_token) }).onConflictDoUpdate({ target: googleBusinessConnectionsTable.googleEmail, set: { refreshTokenEncrypted: encrypt(tokens.refresh_token), updatedAt: new Date() } });
    await db.insert(googleBusinessActivityTable).values({ action: "connected", actorEmail: email, details: {} });
    res.setHeader("Set-Cookie", [cookie(SESSION_COOKIE, makeSession(email), 60 * 60 * 8), clearCookie(STATE_COOKIE)]);
    return res.redirect("/admin/gbp?connected=1");
  } catch { return res.status(502).send("Unable to complete Google connection."); }
});

router.get("/google/status", async (req, res) => {
  const email = requireAdmin(req, res); if (!email) return;
  const connection = await db.query.googleBusinessConnectionsTable.findFirst({ where: eq(googleBusinessConnectionsTable.googleEmail, email) });
  res.json({ ok: true, connected: Boolean(connection), email: connection?.googleEmail ?? email, selectedAccountName: connection?.selectedAccountName, selectedLocationName: connection?.selectedLocationName });
});
router.post("/google/disconnect", async (req, res) => {
  const email = requireAdmin(req, res); if (!email) return;
  await db.delete(googleBusinessConnectionsTable).where(eq(googleBusinessConnectionsTable.googleEmail, email));
  res.setHeader("Set-Cookie", clearCookie(SESSION_COOKIE)); res.json({ ok: true });
});
router.get("/google/accounts", async (req, res) => {
  const email = requireAdmin(req, res); if (!email) return;
  try { const auth = await tokenFor(email); if (!auth) return res.status(404).json({ ok: false, error: "Not connected" }); const response = await auth.request({ url: "https://mybusinessaccountmanagement.googleapis.com/v1/accounts" }); return res.json({ ok: true, accounts: (response.data as { accounts?: unknown[] }).accounts ?? [] }); }
  catch (error) { const [status, message] = apiError(error); return res.status(status).json({ ok: false, error: message }); }
});
router.get("/google/locations", async (req, res) => {
  const email = requireAdmin(req, res); if (!email) return;
  const account = typeof req.query.account === "string" ? req.query.account : ""; if (!/^accounts\/[\w-]+$/.test(account)) return res.status(400).json({ ok: false, error: "Invalid account" });
  try { const auth = await tokenFor(email); if (!auth) return res.status(404).json({ ok: false, error: "Not connected" }); const response = await auth.request({ url: `https://mybusinessbusinessinformation.googleapis.com/v1/${account}/locations`, params: { readMask: "name,title,storeCode,metadata,profile" } }); return res.json({ ok: true, locations: (response.data as { locations?: unknown[] }).locations ?? [] }); }
  catch (error) { const [status, message] = apiError(error); return res.status(status).json({ ok: false, error: message }); }
});
router.get("/google/activity", async (req, res) => { const email = requireAdmin(req, res); if (!email) return; const rows = await db.query.googleBusinessActivityTable.findMany({ where: eq(googleBusinessActivityTable.actorEmail, email), orderBy: desc(googleBusinessActivityTable.createdAt), limit: 20 }); res.json({ ok: true, activity: rows }); });

export default router;
