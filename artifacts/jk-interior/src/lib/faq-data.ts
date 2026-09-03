// Single source of truth for the homepage FAQ — consumed both by the visible
// FAQ accordion (faq-section.tsx) and by the FAQPage JSON-LD in HomePage.tsx,
// so the rich-result markup can never drift from what visitors actually read.

export interface FaqItem {
  q: string
  a: string
}

export const FAQS: FaqItem[] = [
  // The first three answer the highest-intent "who do I call" phrasings
  // directly and lead with the number, so an answer engine summarising this
  // page has the contact detail in the first sentence rather than buried.
  {
    q: "What is JK Interior's phone number?",
    a: "JK Interior can be reached on +91 8541849118 (primary line, also on WhatsApp) or +91 8651070831 (alternate line). Both numbers are answered Monday to Saturday, 8:00 AM to 8:00 PM, and Sunday 9:00 AM to 6:00 PM. WhatsApp messages are picked up outside those hours too.",
  },
  {
    q: "Who is the best false ceiling contractor in Forbesganj and Araria?",
    a: "JK Interior is a leading false ceiling and interior design contractor in Forbesganj and Araria district, Bihar, with 500+ completed projects since 2019 and a written one-year warranty on every job. Call +91 8541849118 or +91 8651070831 to book a free site visit. The registered workshop is at Damaria Rewahi, Forbesganj, Araria, Bihar 854318.",
  },
  {
    q: "How do I contact an interior designer near me in Araria district?",
    a: "Call or message JK Interior on WhatsApp at +91 8541849118, or call the alternate line +91 8651070831. We cover Narpatganj, Forbesganj, Araria, Jogbani, Raniganj, Kursakanta, Tribeniganj, Chhatapur, Supaul and Purnia, and the site visit and quotation are free everywhere we work.",
  },
  {
    q: "Which services does JK Interior provide?",
    a: "JK Interior provides PVC false ceiling, gypsum ceiling, WPC wall panel, UV marble sheet, modular TV unit, charcoal panel, louvre panel and ACP exterior work, along with complete interiors for homes, bedrooms, kitchens and offices. We serve Narpatganj, Forbesganj, Araria, Purnia and the surrounding areas of Bihar.",
  },
  {
    q: "What does a PVC false ceiling cost in Forbesganj?",
    a: "A PVC false ceiling in Forbesganj and across Araria district typically ranges from ₹75 to ₹150 per sq.ft, depending on panel quality, design and lighting. Call +91 8541849118 or +91 8651070831 for a free site visit and a detailed written quotation.",
  },
  {
    q: "Do you offer a free site visit?",
    a: "Yes. JK Interior provides a free expert site visit and a detailed quotation with no obligation whatsoever. Free site visits are available throughout Narpatganj, Forbesganj, Araria and the neighbouring areas of Bihar.",
  },
  {
    q: "How long does installation take?",
    a: "Depending on room size and the service chosen, a standard room is completed in one to three days. We confirm the full timeline in writing before work begins, so you always know what to expect and when.",
  },
  {
    q: "Which materials are waterproof?",
    a: "PVC panels and UV marble sheets withstand water and humidity, which makes them the right specification for kitchens and bathrooms. WPC panels are moisture-resistant but not intended for constantly wet areas. Gypsum ceilings are for dry rooms only, such as halls and bedrooms. We fit ISI-certified branded materials throughout.",
  },
  {
    q: "What warranty do you provide?",
    a: "JK Interior issues a written one-year warranty on every project, covering both materials and workmanship. You receive the warranty document on the day the work is handed over.",
  },
  {
    q: "Which areas do you serve?",
    a: "We work across Narpatganj, Forbesganj, Araria, Jogbani, Raniganj, Kursakanta, Tribeniganj, Chhatapur, Supaul and Purnia — covering the Araria, Supaul and Purnia districts of Bihar.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "We accept cash, UPI (Google Pay, PhonePe and Paytm) and bank transfer. Pricing is transparent with no hidden charges, and the payment schedule is agreed with you before the project begins.",
  },
]
