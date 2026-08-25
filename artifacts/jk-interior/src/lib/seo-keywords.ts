/**
 * The search phrases the Services and Gallery sections are written to rank for.
 *
 * These strings are the *exact* queries JK Interior is targeting in Google
 * Search Console, so they are declared once here and reused verbatim wherever
 * they surface — visible search chips, image `alt`/`title` copy, `aria-label`s
 * and the `keywords` field of the JSON-LD emitted by the two sections. Editing
 * a phrase here changes it everywhere at once; nothing may re-type one by hand.
 *
 * Each entry keeps the phrase next to the page that actually answers it, so a
 * chip is never a dead keyword — it is an internal link to the service that
 * sells it.
 */

export interface TargetKeyword {
  /** The query, lower-cased exactly as it is searched. */
  phrase: string
  /** Short label used when the phrase is rendered as a chip. */
  label: string
  /** Where a visitor who searched this should land. */
  href: string
  group: "brand" | "ceiling" | "wall" | "decor"
}

export const TARGET_KEYWORDS: readonly TargetKeyword[] = [
  // ── Brand & location ──────────────────────────────────────────────────────
  {
    phrase: "jk interior forbesganj",
    label: "JK Interior Forbesganj",
    href: "/cities/forbesganj",
    group: "brand",
  },
  {
    phrase: "interior designer in araria bihar",
    label: "Interior designer in Araria Bihar",
    href: "/cities/araria",
    group: "brand",
  },
  {
    phrase: "false ceiling contractor forbesganj",
    label: "False ceiling contractor Forbesganj",
    href: "/services/gypsum-ceiling",
    group: "brand",
  },

  // ── Ceilings ──────────────────────────────────────────────────────────────
  {
    phrase: "gypsum false ceiling design with price",
    label: "Gypsum false ceiling design with price",
    href: "/services/gypsum-ceiling",
    group: "ceiling",
  },
  {
    phrase: "pvc ceiling design for bedroom",
    label: "PVC ceiling design for bedroom",
    href: "/services/pvc-false-ceiling",
    group: "ceiling",
  },
  {
    phrase: "grid false ceiling installation",
    label: "Grid false ceiling installation",
    href: "/services/grid-ceiling",
    group: "ceiling",
  },

  // ── Walls & panels ────────────────────────────────────────────────────────
  {
    phrase: "pvc wall panel design catalog",
    label: "PVC wall panel design catalog",
    href: "/services/wpc-wall-panel",
    group: "wall",
  },
  {
    phrase: "wpc louvers wall panelling",
    label: "WPC louvers wall panelling",
    href: "/services/wpc-wall-panel",
    group: "wall",
  },
  {
    phrase: "charcoal panel suppliers",
    label: "Charcoal panel suppliers",
    href: "/services/wpc-wall-panel",
    group: "wall",
  },
  {
    phrase: "uv marble sheet wall cladding",
    label: "UV marble sheet wall cladding",
    href: "/services/uv-marble-sheet",
    group: "wall",
  },

  // ── Decor & living ────────────────────────────────────────────────────────
  {
    phrase: "modern tv unit design for living room",
    label: "Modern TV unit design for living room",
    href: "/services/modular-tv-unit",
    group: "decor",
  },
  {
    phrase: "modular kitchen design service",
    label: "Modular kitchen design service",
    href: "/contact",
    group: "decor",
  },
] as const

/** Every targeted phrase, comma-joined — the `keywords` value for JSON-LD and meta tags. */
export const TARGET_KEYWORDS_CONTENT = TARGET_KEYWORDS.map((k) => k.phrase).join(", ")

/** The three brand/location phrases, used to sign image captions and aria labels. */
export const LOCAL_KEYWORDS = TARGET_KEYWORDS.filter((k) => k.group === "brand").map((k) => k.phrase)

/** Look a phrase up so a component can quote it without re-typing it. */
export function keyword(phrase: string): string {
  const found = TARGET_KEYWORDS.find((k) => k.phrase === phrase)
  return found ? found.phrase : phrase
}

/** The chips for one group, e.g. the ceiling phrases under the ceiling gallery. */
export function keywordsByGroup(group: TargetKeyword["group"]): TargetKeyword[] {
  return TARGET_KEYWORDS.filter((k) => k.group === group)
}

/** Turns a list of phrases into the `keywords` string schema.org expects. */
export function keywordsContent(phrases: readonly string[]): string {
  return phrases.join(", ")
}
