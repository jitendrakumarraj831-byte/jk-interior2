import nodemailer from "nodemailer";

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "";
const SMTP_USER    = process.env.SMTP_USER    || "";
const SMTP_PASS    = process.env.SMTP_PASS    || "";
const SMTP_HOST    = process.env.SMTP_HOST    || "smtp.gmail.com";
const SMTP_PORT    = parseInt(process.env.SMTP_PORT || "587");

function isConfigured(): boolean {
  return !!(NOTIFY_EMAIL && SMTP_USER && SMTP_PASS);
}

function createTransport() {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export interface LeadData {
  id?: number;
  name: string;
  phone: string;
  city?: string | null;
  service?: string | null;
  estimate?: string | null;
  preferred_time?: string | null;
  chat_summary?: string | null;
}

export async function sendLeadNotification(lead: LeadData): Promise<void> {
  if (!isConfigured()) return;

  const now = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const rows = [
    ["Name",     lead.name],
    ["Phone",    lead.phone],
    ["City",     lead.city        || "—"],
    ["Service",  lead.service     || "—"],
    ["Estimate", lead.estimate    || "—"],
    ["Visit",    lead.preferred_time || "—"],
    ["Summary",  lead.chat_summary || "—"],
    ["Time",     now],
  ];

  const tableRows = rows
    .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#6b7280;font-size:13px;white-space:nowrap">${k}</td><td style="padding:6px 12px;font-weight:600;font-size:13px;color:#111827">${v}</td></tr>`)
    .join("");

  const waMsg = encodeURIComponent(
    `👋 Namaste ${lead.name} ji!\nMain JK Interior se call kar raha hoon.\n${lead.service ? `Aapne ${lead.service} ke baare mein inquiry ki thi.` : ""}\n${lead.estimate ? `Rough estimate: ${lead.estimate}` : ""}\nFree site visit ke liye kab aana theek rahega?\n📞 +91 8651070831`.trim()
  );
  const waLink = `https://wa.me/${lead.phone.replace(/\D/g, "").replace(/^0|^91/, "")}?text=${waMsg}`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Inter,Arial,sans-serif">
  <div style="max-width:520px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
    <div style="background:linear-gradient(135deg,#15803d,#16a34a);padding:24px 28px">
      <div style="display:flex;align-items:center;gap:12px">
        <div style="background:rgba(255,255,255,0.2);border-radius:10px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:900;color:#fff">JK</div>
        <div>
          <div style="color:#fff;font-size:16px;font-weight:700">New Lead — JK Interior</div>
          <div style="color:rgba(255,255,255,0.7);font-size:12px;margin-top:2px">${now}</div>
        </div>
      </div>
    </div>
    <div style="padding:24px 28px">
      <table style="width:100%;border-collapse:collapse;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb">
        <tbody>${tableRows}</tbody>
      </table>
      <div style="margin-top:20px;display:flex;gap:12px">
        <a href="${waLink}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:12px 20px;border-radius:10px;font-size:13px;font-weight:700">💬 WhatsApp Now</a>
        <a href="tel:${lead.phone}" style="display:inline-block;background:#f0fdf4;color:#15803d;border:1px solid #bbf7d0;text-decoration:none;padding:12px 20px;border-radius:10px;font-size:13px;font-weight:700">📞 Call</a>
      </div>
    </div>
    <div style="padding:16px 28px;background:#f9fafb;border-top:1px solid #f3f4f6;text-align:center;color:#9ca3af;font-size:11px">
      JK Interior · Forbesganj, Araria, Bihar · +91 8651070831
    </div>
  </div>
</body>
</html>`;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nWhatsApp: ${waLink}`;

  const transport = createTransport();
  await transport.sendMail({
    from: `"JK Interior Leads" <${SMTP_USER}>`,
    to: NOTIFY_EMAIL,
    subject: `🏠 New Lead: ${lead.name} (${lead.phone}) — ${lead.service || "General Enquiry"}`,
    html,
    text,
  });
}
