import { Router } from "express";
import { z } from "zod";

const router = Router();

const ContactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  phone: z.string().trim().min(7, "Phone is too short").max(20),
  service: z.string().trim().min(1).max(120),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

router.post("/contact", async (req, res) => {
  let body: unknown;
  try {
    body = req.body;
  } catch {
    res.status(400).json({ ok: false, error: "Invalid JSON" });
    return;
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: "Validation failed", issues: parsed.error.flatten() });
    return;
  }

  const { name, phone, service, message } = parsed.data;

  console.log(`[/api/contact] New enquiry: ${name} (${phone}) — ${service}`);
  console.log(`[/api/contact] Message: ${message}`);

  res.json({ ok: true });
});

export default router;
