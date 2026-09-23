// Single source of truth for the homepage FAQ — consumed both by the visible
// FAQ accordion (faq-section.tsx) and by the FAQPage JSON-LD in HomePage.tsx,
// so the rich-result markup can never drift from what visitors actually read.

import { ADDRESS_LINE, HOURS_SENTENCE, SERVICE_AREA_NAMES } from "./seo.js"

export interface FaqItem {
  q: string
  a: string
}

/**
 * Short, factual answers to the questions customers actually ask — written so
 * each answer stands on its own (the first sentence answers the question).
 * Every rate and timeline here matches the service pages.
 */
export const FAQS: FaqItem[] = [
  {
    q: "What is JK Interior's phone number?",
    a: `JK Interior can be reached on +91 8541849118 (primary line, also on WhatsApp) or +91 8651070831 (alternate line). Opening hours: ${HOURS_SENTENCE}. WhatsApp messages are picked up outside those hours too.`,
  },
  {
    q: "Where is JK Interior located?",
    a: `Our registered workshop is at ${ADDRESS_LINE}, Araria district — the address on our Google Business Profile. From there we travel to customers across ${SERVICE_AREA_NAMES}.`,
  },
  {
    q: "What areas does JK Interior serve?",
    a: `We work in ${SERVICE_AREA_NAMES}. Forbesganj is our business location; the other towns are service areas we travel to. The site visit and quotation are free everywhere we work.`,
  },
  {
    q: "Which services does JK Interior provide?",
    a: "Gypsum false ceilings, PVC false ceilings, grid ceilings, gypsum and glass partition walls, WPC wall panels (including louvre and fluted designs), UV marble sheet walls, modular TV units and artificial grass.",
  },
  {
    q: "What is a gypsum false ceiling?",
    a: "A gypsum false ceiling is a ceiling of gypsum boards screwed to a galvanised metal frame hung below the roof slab. The joints are taped and finished so it looks like one smooth, painted surface, and it can be shaped into stepped borders with hidden cove lighting. It is meant for dry rooms such as halls and bedrooms.",
  },
  {
    q: "What does a gypsum false ceiling cost in Forbesganj?",
    a: "A gypsum false ceiling in Forbesganj and Araria district usually costs ₹75–₹210 per sq.ft. A plain single-level ceiling sits at the lower end; cove lighting and multi-level designs at the upper end. The exact figure is set after the free site visit.",
  },
  {
    q: "How much does a PVC ceiling cost?",
    a: "A PVC false ceiling usually costs ₹75–₹150 per sq.ft, depending on the panel design (plain, wood-grain, marble-print or high-gloss) and the lighting. Call +91 8541849118 for a free site visit and written quotation.",
  },
  {
    q: "Gypsum or PVC ceiling — which is better?",
    a: "Neither is better everywhere. PVC is fully waterproof and wipe-clean, so it suits kitchens, bathrooms, balconies and shops. Gypsum gives a smoother, painted finish with cove lighting, so it suits halls and bedrooms — but it must be kept away from water and steam.",
  },
  {
    q: "Which ceiling is suitable for a shop?",
    a: "For most shops a grid ceiling is the most practical: it is quick to install and any tile lifts out to reach wiring or AC ducts. PVC suits shops that need a moisture-proof, wipe-clean ceiling, and gypsum suits showrooms that want a premium finish.",
  },
  {
    q: "How long does false ceiling installation take?",
    a: "A standard room usually takes one to three days: PVC is often finished in a day, while gypsum takes two to three days because the joints are taped and finished. We confirm the full timeline in writing before work begins.",
  },
  {
    q: "Do you offer a free site visit?",
    a: "Yes. The site visit and quotation are free with no obligation. We measure in person and prepare the written quotation from those measurements.",
  },
  {
    q: "Which materials are waterproof?",
    a: "PVC panels and UV marble sheets withstand water and humidity, which makes them the right choice for kitchens and bathrooms. WPC panels are moisture-resistant but not meant for constantly wet areas. Gypsum ceilings are for dry rooms only.",
  },
  {
    q: "What warranty do you provide?",
    a: "JK Interior gives a written one-year warranty on every project, covering materials and workmanship. You receive the warranty document on the day the work is handed over.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "We accept cash, UPI (Google Pay, PhonePe and Paytm) and bank transfer. The payment schedule is agreed with you before the project begins.",
  },
]
