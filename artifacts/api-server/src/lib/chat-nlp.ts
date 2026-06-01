export type Intent =
  | "greeting"
  | "pricing"
  | "booking"
  | "material_info"
  | "comparison"
  | "faq"
  | "off_topic"
  | "affirmation"
  | "negation"
  | "view_catalog"
  | "book_visit"
  | "lead"
  | "complaint"
  | "unknown";

const HINGLISH_NORMALIZATIONS: Array<[RegExp, string]> = [
  [/\bkitne\s*mai(?:n)?\b/gi, "kitne mein"],
  [/\bkitna\s*lagega\b/gi, "price"],
  [/\bceiling\s*ka\s*rate\b/gi, "price"],
  [/\bgypsom\b/gi, "gypsum"],
  [/\bjepsam\b/gi, "gypsum"],
  [/\bpv\s*c\b/gi, "pvc"],
  [/\bpivi\s*si\b/gi, "pvc"],
  [/\bfalse\s*sealing\b/gi, "false ceiling"],
  [/\bfols\s*siling\b/gi, "false ceiling"],
  [/\bflute\s*panel\b/gi, "fluted panel"],
  [/\bvisit\s*book\b/gi, "book visit"],
];

export function normalizeHinglish(text: string): string {
  let out = text.toLowerCase().trim();

  out = out
    .replace(/[?!.]{2,}/g, " ")
    .replace(/\s+/g, " ");

  for (const [re, val] of HINGLISH_NORMALIZATIONS) {
    out = out.replace(re, val);
  }

  return out;
}

export function extractMaterial(text: string): string | null {
  const t = normalizeHinglish(text);

  if (t.includes("pvc")) return "PVC";
  if (t.includes("gypsum")) return "Gypsum";
  if (t.includes("wpc")) return "WPC";
  if (t.includes("fluted")) return "Fluted Panel";
  if (t.includes("uv")) return "UV Marble Sheet";
  if (t.includes("marble")) return "Marble Sheet";

  return null;
}

export function detectIntent(text: string): Intent {
  const t = normalizeHinglish(text);

  // Greeting (short greeting only)
  if (
    /^(hi|hello|hey|namaste|namaskar|hii|helo|hy|hye|good\s*(morning|evening|afternoon)|salam)\b/.test(
      t
    ) &&
    t.split(/\s+/).length <= 3
  ) {
    return "greeting";
  }

  // Affirmation
  if (
    /^(ha(n|a)?n?|haan|yes|okay|ok|bilkul|zaroor|sure|theek|thik|sahi|right|correct|perfect|done|proceed)\b/.test(
      t
    )
  ) {
    return "affirmation";
  }

  // Negation
  if (
    /^(nahi|no|nope|mat|band karo|ruk|stop|cancel|baad mein|later)\b/.test(
      t
    )
  ) {
    return "negation";
  }

  // Booking
  if (
    /\b(book|booking|appointment|visit|site visit|ghar aao|aa jao|bulao|milna|demo|consultation|schedule|free visit|quotation bhejo|quote bhejo|estimate bhejo)\b/.test(
      t
    )
  ) {
    return "booking";
  }

  // Book Visit
  if (
    /\b(site\s*visit|ghar\s*(?:pe|par|aa|aao|bulao)|free\s*(?:visit|measurement|maap)|measurement|naaap|naap\s*lena|visit\s*book|book\s*(?:a\s*)?visit|aao\s*ghar)\b/.test(
      t
    )
  ) {
    return "book_visit";
  }

  // Pricing
  if (
    /\b(price|pricing|rate|cost|kitna|lagega|lagta|budget|estimate|paisa|rupee|rs\b|₹|cheap|costly|expensive|affordable|how much|kitne mein|kitne ka|total|charge|fee|sqft|per foot|per sq)\b/.test(
      t
    )
  ) {
    return "pricing";
  }

  // Comparison
  if (
    /\b(better|best|vs|versus|compare|difference|differ|konsa|kaun sa|which one|zyada|kam|acha|bekar|suggest|recommend|ya)\b/.test(
      t
    )
  ) {
    return "comparison";
  }

  // Lead Intent
  if (
    /\b(contact|phone|number|mobile|call|whatsapp|address|location|office|shop|showroom)\b/.test(
      t
    )
  ) {
    return "lead";
  }

  // Complaint
  if (
    /\b(problem|issue|complaint|late|delay|bad|poor|damage|broken|refund|not working|angry|unsatisfied)\b/.test(
      t
    )
  ) {
    return "complaint";
  }

  // Material Info
  if (
    /\b(gypsum|pvc|wpc|uv|marble|fluted|panel|ceiling|wall|floor|modular|tv unit|wardrobe|kitchen|false ceiling|design|texture|color|rang|finish|look|style|material|quality|thickness|durability|waterproof|fire|interior|renovation|decoration|lagwana|banwana|karwana)\b/.test(
      t
    )
  ) {
    return "material_info";
  }

  // FAQ
  if (
    /\b(guarantee|warranty|how long|kitne din|kitne time|process|install|labor|worker|team|experience|kab se|kitne saal|review|feedback|trust|legit|real|fake|scam|safe)\b/.test(
      t
    )
  ) {
    return "faq";
  }

  // View Catalog
  if (
    /\b(catalog|catalogue|design\s*(?:dekho|dikhao|bhejo|send|share)|brochure|pdf|designs?\s*(?:list|collection|photos?)|kaunse\s*design|design\s*kaunse|latest\s*design|new\s*design)\b/.test(
      t
    )
  ) {
    return "view_catalog";
  }

  // Off Topic
  if (
    /\b(cricket|ipl|football|movie|film|news|politics|election|weather|joke|meme|recipe|khana|game|song|music|gf|girlfriend|bf|love|date|shaadi|marriage|job|naukri|stock|share market|crypto|bitcoin)\b/.test(
      t
    )
  ) {
    return "off_topic";
  }

  return "unknown";
}

export function isRepetitiveReply(
  newReply: string,
  previousAssistantReplies: string[]
): boolean {
  const norm = newReply.trim().toLowerCase();

  for (const prevRaw of previousAssistantReplies.slice(-3)) {
    const prev = prevRaw.trim().toLowerCase();

    if (!prev || !norm) continue;

    if (prev === norm) return true;

    const prevWords = new Set(
      prev.split(/\s+/).filter((w) => w.length > 3)
    );

    const newWords = norm
      .split(/\s+/)
      .filter((w) => w.length > 3);

    if (newWords.length === 0) continue;

    const overlap = newWords.filter((w) =>
      prevWords.has(w)
    ).length;

    if (overlap / newWords.length > 0.85) {
      return true;
    }
  }

  return false;
}
