import { NextResponse } from "next/server"
import { Pool } from "pg"
import { z } from "zod"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

function escape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}

const LeadSchema = z.object({
  name:          z.string().min(1).max(120).transform(escape),
  phone:         z.string().min(10).max(15),
  city:          z.string().max(100).optional(),
  service:       z.string().max(120).optional(),
  estimate:      z.string().max(200).optional(),
  preferred_time:z.string().max(100).optional(),
  chat_summary:  z.string().max(1000).optional(),
})

const ADMIN_KEY = process.env.ADMIN_KEY || "jkadmin2024"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const d = LeadSchema.parse(body)
    await pool.query(
      `INSERT INTO leads (name, phone, city, service, estimate, preferred_time, chat_summary)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [d.name, d.phone, d.city ?? null, d.service ?? null, d.estimate ?? null,
       d.preferred_time ?? null, d.chat_summary ?? null]
    )
    return NextResponse.json({ ok: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ ok: false, issues: err.issues }, { status: 400 })
    }
    console.error("lead save error", err)
    return NextResponse.json({ ok: false, error: "save_failed" }, { status: 502 })
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get("key") !== ADMIN_KEY) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
  try {
    const { rows } = await pool.query(
      `SELECT id,name,phone,city,service,estimate,preferred_time,chat_summary,is_read,created_at
       FROM leads ORDER BY created_at DESC LIMIT 300`
    )
    return NextResponse.json({ ok: true, leads: rows })
  } catch (err) {
    console.error("lead fetch error", err)
    return NextResponse.json({ ok: false, error: "fetch_failed" }, { status: 502 })
  }
}

export async function PATCH(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get("key") !== ADMIN_KEY) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
  try {
    const { id } = await req.json()
    await pool.query("UPDATE leads SET is_read=TRUE WHERE id=$1", [id])
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 })
  }
}
