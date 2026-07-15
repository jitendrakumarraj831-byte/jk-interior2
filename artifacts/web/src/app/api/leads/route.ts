import { NextResponse } from "next/server";
import { db } from "@workspace/db";
import { leadsTable, insertLeadSchema } from "@workspace/db/schema";
import { desc, eq } from "drizzle-orm";
import { rateLimit, clientIp } from "@/lib/rate-limit";

function isAuthorized(request: Request) {
  const key = request.headers.get("x-admin-key");
  return Boolean(key) && key === process.env.ADMIN_KEY;
}

/** Blocks brute-force login attempts: max 5 failed x-admin-key checks per IP every 15 minutes. */
function checkAuth(request: Request) {
  if (isAuthorized(request)) return true;
  const allowed = rateLimit(`admin-auth:${clientIp(request)}`, 5, 15 * 60 * 1000);
  return allowed ? false : "locked";
}

export async function POST(request: Request) {
  if (!rateLimit(`lead-submit:${clientIp(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);

  // Honeypot: a hidden form field real visitors never fill in. Pretend success so bots don't adapt.
  if (body && typeof body === "object" && "website" in body && body.website) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const parsed = insertLeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid lead data" }, { status: 400 });
  }

  const [lead] = await db.insert(leadsTable).values(parsed.data).returning();
  return NextResponse.json({ ok: true, lead }, { status: 201 });
}

export async function GET(request: Request) {
  const auth = checkAuth(request);
  if (auth === "locked") {
    return NextResponse.json({ ok: false, error: "Too many attempts. Try again later." }, { status: 429 });
  }
  if (!auth) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const leads = await db.query.leadsTable.findMany({ orderBy: desc(leadsTable.createdAt) });
  return NextResponse.json({ ok: true, leads });
}

export async function PATCH(request: Request) {
  const auth = checkAuth(request);
  if (auth === "locked") {
    return NextResponse.json({ ok: false, error: "Too many attempts. Try again later." }, { status: 429 });
  }
  if (!auth) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const id = body?.id;
  if (typeof id !== "number") {
    return NextResponse.json({ ok: false, error: "Missing lead id" }, { status: 400 });
  }
  await db.update(leadsTable).set({ isRead: true }).where(eq(leadsTable.id, id));
  return NextResponse.json({ ok: true });
}
