import { NextResponse } from "next/server";
import { db } from "@workspace/db";
import { leadsTable, insertLeadSchema } from "@workspace/db/schema";
import { desc, eq } from "drizzle-orm";

function isAuthorized(request: Request) {
  const key = request.headers.get("x-admin-key");
  return Boolean(key) && key === process.env.ADMIN_KEY;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = insertLeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid lead data" }, { status: 400 });
  }

  const [lead] = await db.insert(leadsTable).values(parsed.data).returning();
  return NextResponse.json({ ok: true, lead }, { status: 201 });
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const leads = await db.query.leadsTable.findMany({ orderBy: desc(leadsTable.createdAt) });
  return NextResponse.json({ ok: true, leads });
}

export async function PATCH(request: Request) {
  if (!isAuthorized(request)) {
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
