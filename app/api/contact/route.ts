import { NextResponse } from "next/server"
import { z } from "zod"
import { sendEmail } from "@/src/utils/replitmail"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const ContactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  phone: z.string().trim().min(7, "Phone is too short").max(20),
  service: z.string().trim().min(1).max(120),
  message: z.string().trim().min(1, "Message is required").max(2000),
})

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 })
  }

  const parsed = ContactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { name, phone, service, message } = parsed.data

  const subject = `New JK Interior enquiry — ${name} (${service})`
  const text =
    `New enquiry from JK Interior website\n\n` +
    `Name:    ${name}\n` +
    `Phone:   ${phone}\n` +
    `Service: ${service}\n\n` +
    `Message:\n${message}\n\n` +
    `--\nReply directly or call the customer back.`

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;color:#0f172a">
      <div style="background:linear-gradient(135deg,#1d4ed8,#2563eb);padding:24px;border-radius:12px 12px 0 0;color:#fff">
        <h1 style="margin:0;font-size:20px;font-weight:800">New JK Interior Enquiry</h1>
        <p style="margin:6px 0 0;opacity:0.85;font-size:13px">From the website contact form</p>
      </div>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-top:0;padding:24px;border-radius:0 0 12px 12px">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:8px 0;color:#64748b;width:90px"><b>Name</b></td><td style="padding:8px 0">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b"><b>Phone</b></td><td style="padding:8px 0"><a href="tel:${escapeHtml(phone)}" style="color:#2563eb;text-decoration:none">${escapeHtml(phone)}</a></td></tr>
          <tr><td style="padding:8px 0;color:#64748b"><b>Service</b></td><td style="padding:8px 0">${escapeHtml(service)}</td></tr>
        </table>
        <div style="margin-top:16px;padding:16px;background:#fff;border:1px solid #e2e8f0;border-radius:8px">
          <p style="margin:0 0 8px;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em"><b>Message</b></p>
          <p style="margin:0;white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</p>
        </div>
        <p style="margin:20px 0 0;font-size:12px;color:#64748b">Reply to this lead quickly to convert. Call <b>${escapeHtml(phone)}</b> or message on WhatsApp.</p>
      </div>
    </div>
  `

  try {
    await sendEmail({ subject, text, html })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[/api/contact] sendEmail failed:", err)
    return NextResponse.json(
      { ok: false, error: "Email service unavailable" },
      { status: 502 }
    )
  }
}
