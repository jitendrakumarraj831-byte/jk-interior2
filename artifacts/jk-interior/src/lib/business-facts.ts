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

import { ADDRESS_LINE, BUSINESS, FOUNDED_LABEL, HOURS_SENTENCE, SERVICE_AREA_NAMES } from "./seo.js"

export interface BusinessFact {
  term: string
  detail: string
}

export const BUSINESS_FACTS: BusinessFact[] = [
  {
    term: "Business",
    detail: `${BUSINESS.name} — false ceiling contractor and interior finishing company, open since ${FOUNDED_LABEL}.`,
  },
  {
    term: "Address",
    detail: `${ADDRESS_LINE} (Araria district) — the workshop address on our Google Business Profile.`,
  },
  {
    term: "Areas served",
    detail: `${SERVICE_AREA_NAMES}. Forbesganj is our business location; the other towns are service areas we travel to.`,
  },
  {
    term: "Services",
    detail:
      "PVC false ceiling (₹75–₹150/sq.ft), gypsum false ceiling (₹75–₹210/sq.ft), grid ceiling (₹45–₹115/sq.ft), partition wall (₹100–₹750/sq.ft), WPC wall panels (₹180–₹650/sq.ft), UV marble sheets (₹45–₹120/sq.ft), modular TV units (from ₹15,000) and artificial grass (₹40–₹150/sq.ft).",
  },
  {
    term: "Hours",
    detail: `${HOURS_SENTENCE}.`,
  },
  {
    term: "Site visit",
    detail: "Free wherever we work, with no obligation — measurements are taken in person and the written quotation is prepared from them.",
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
  `JK Interior works from its registered workshop in Forbesganj and travels to customers across Araria district, Purnia and Supaul. A call or WhatsApp message confirms whether your village or mohalla is on the route before you book.`
