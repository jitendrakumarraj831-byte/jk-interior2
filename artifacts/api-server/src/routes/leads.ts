import { Router } from "express";
import { z } from "zod";

const router = Router();

const ADMIN_KEY = process.env.ADMIN_KEY || "jkadmin2024";

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

// Lazy-load db to avoid crashing if DATABASE_URL is missing
async function getDb() {
  try {
    const { Pool } = await import("pg");
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    return pool;
  } catch {
    return null;
  }
}

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
      console.log("[leads] no db — lead logged:", JSON.stringify(d));
      res.json({ ok: true });
      return;
    }
    await db.query(
      `INSERT INTO leads (name, phone, city, service, estimate, preferred_time, chat_summary)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [d.name, d.phone, d.city ?? null, d.service ?? null, d.estimate ?? null,
       d.preferred_time ?? null, d.chat_summary ?? null]
    );
    res.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ ok: false, issues: err.issues }); return; }
    console.error("lead save error", err);
    res.status(502).json({ ok: false, error: "save_failed" });
  }
});

router.get("/leads", async (req, res) => {
  if (req.query.key !== ADMIN_KEY) { res.status(401).json({ ok: false }); return; }
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
  if (req.query.key !== ADMIN_KEY) { res.status(401).json({ ok: false }); return; }
  try {
    const { id } = req.body;
    const db = await getPool();
    if (!db) { res.json({ ok: true }); return; }
    await db.query("UPDATE leads SET is_read=TRUE WHERE id=$1", [id]);
    res.json({ ok: true });
  } catch {
    res.status(502).json({ ok: false });
  }
});

export default router;
