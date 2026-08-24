/**
 * The plain-text facts the website itself publishes about JK Interior.
 *
 * `BUSINESS_FACTS` backs the visible "JK Interior at a Glance" section
 * (components/business-summary.tsx) AND the AI assistant's system prompt
 * (business-data.ts → buildSystemPrompt). One list, two consumers — so the
 * assistant can never quote an address, an hour or a rate the page doesn't show.
 *
 * Deliberately free of React and lucide imports: `api/chat.ts` pulls this in
 * from the serverless function, where neither exists.
 */

export interface BusinessFact {
  term: string
  detail: string
}

export const BUSINESS_FACTS: BusinessFact[] = [
  {
    term: "Business",
    detail:
      "JK Interior — false ceiling contractor and interior designer, operating since 2019 with 500+ completed projects.",
  },
  {
    term: "Address",
    detail: "Damaria Rewahi, Forbesganj, Araria district, Bihar 854318. Day-to-day operating base: Narpatganj.",
  },
  {
    term: "Areas served",
    detail:
      "Narpatganj, Forbesganj, Araria, Jogbani, Raniganj, Kursakanta, Tribeniganj, Chhatapur, Supaul and Purnia — roughly an 80 km radius.",
  },
  {
    term: "Services",
    detail:
      "PVC false ceiling (₹75–₹150/sq.ft), gypsum false ceiling (₹75–₹210/sq.ft), WPC wall panels (₹180–₹650/sq.ft), UV marble sheets (₹45–₹120/sq.ft), modular TV units (from ₹15,000), grid ceilings, partition walls and complete home or office interiors.",
  },
  {
    term: "Hours",
    detail: "Monday to Saturday, 8:00 AM – 8:00 PM. Sunday, 9:00 AM – 6:00 PM. WhatsApp is answered outside these hours.",
  },
  {
    term: "Site visit",
    detail: "Free everywhere we work, with no obligation — measurements taken in person and a written quotation the same day.",
  },
  {
    term: "Warranty",
    detail: "A written one-year warranty on materials and workmanship for every project, handed over on completion.",
  },
]

/** Shown on every service page directly under the price tiers — the one non-negotiable disclaimer. */
export const PRICE_DISCLAIMER =
  "Every rate on this page is a current Forbesganj and Araria market estimate rather than a fixed quotation. Your final figure is set at the free site visit and varies with your design, the material grade you choose and the total area. Combining work — ceiling, wall panelling and television unit together — brings the per-sq.ft rate down."

export const SERVICE_AREA_NOTE =
  "JK Interior operates from Narpatganj, with its registered workshop in Forbesganj, and travels roughly 80 km around it — Narpatganj, Forbesganj, Araria, Jogbani, Raniganj, Purnia, Supaul, Tribeniganj, Kursakanta and Chhatapur. A single call or WhatsApp message confirms whether your village or mohalla is on the route before you book."
