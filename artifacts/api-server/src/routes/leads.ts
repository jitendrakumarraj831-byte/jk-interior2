import { Router } from "express";
import { z } from "zod";
import { sendLeadNotification } from "../lib/email.js";
import { logger } from "../lib/logger.js";

const router = Router();

function getAdminKey(): string | null {
  return process.env.ADMIN_KEY ?? null;
}

function checkAdmin(req: { headers: Record<string, string | string[] | undefined> }): boolean {
  const key = getAdminKey();
  if (!key) return false;
  const provided = req.headers["x-admin-key"];
  if (!provided) return false;
  const normalized = Array.isArray(provided) ? provided[0] : provided;
  return typeof normalized === "string" && normalized.length > 0 && normalized === key;
}

function escape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const LeadSchema = z.object({
  name: z.string().min(1).max(120).transform(escape),
  phone: z.string().min(10).max(15),
  city: z.string().max(100).optional(),
  service: z.string().max(120).optional(),
  estimate: z.string().max(200).optional(),
  preferred_time: z.string().max(100).optional(),
  chat_summary: z.string().max(1000).optional(),
});

let pool: any = null;
async function getPool() {
  if (!pool && process.env.DATABASE_URL) {
    const { Pool } = await import("pg") as any;
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return pool;
}

router.post("/leads", async (req, res) => {
  try {
    const d = LeadSchema.parse(req.body);
    const db = await getPool();
    if (!db) {
      logger.warn({ lead: d }, "leads - no db, lead logged");
      res.json({ ok: true });
      return;
    }
    const insertResult = await db.query(
      `INSERT INTO leads (name, phone, city, service, estimate, preferred_time, chat_summary)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
      [d.name, d.phone, d.city ?? null, d.service ?? null, d.estimate ?? null,
       d.preferred_time ?? null, d.chat_summary ?? null]
    );
    const id = insertResult.rows[0]?.id;
    sendLeadNotification({ id, ...d }).catch((err: unknown) => {
      logger.error({ err }, "email notification failed");
    });
    res.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ ok: false, issues: err.issues }); return; }
    logger.error({ err }, "lead save error");
    res.status(502).json({ ok: false, error: "save_failed" });
  }
});

router.get("/leads", async (req, res) => {
  if (!checkAdmin(req as any)) { res.status(401).json({ ok: false }); return; }
  try {
    const db = await getPool();
    if (!db) { res.json({ ok: true, leads: [] }); return; }
    const { rows } = await db.query(
      `SELECT id,name,phone,city,service,estimate,preferred_time,chat_summary,is_read,created_at
       FROM leads ORDER BY created_at DESC LIMIT 300`
    );
    res.json({ ok: true, leads: rows });
  } catch (err) {
    console.error("lead fetch error", err);
    res.status(502).json({ ok: false, error: "fetch_failed" });
  }
});

router.patch("/leads", async (req, res) => {
  if (!checkAdmin(req as any)) { res.status(401).json({ ok: false }); return; }
  try {
    const id = Number(req.body?.id);
    if (!Number.isInteger(id) || id <= 0) { res.status(400).json({ ok: false, error: "invalid_id" }); return; }
    const db = await getPool();
    if (!db) { res.json({ ok: true }); return; }
    const result = await db.query("UPDATE leads SET is_read=TRUE WHERE id=$1", [id]);
    if ((result.rowCount ?? 0) === 0) { res.status(404).json({ ok: false, error: "not_found" }); return; }
    res.json({ ok: true });
  } catch {
    res.status(502).json({ ok: false });
  }
});

export default router;
