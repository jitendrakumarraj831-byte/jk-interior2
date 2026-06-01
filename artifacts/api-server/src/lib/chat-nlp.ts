export type Intent =
  | "greeting" | "pricing" | "booking" | "material_info" | "comparison"
  | "faq" | "off_topic" | "affirmation" | "negation" | "view_catalog"
  | "book_visit" | "unknown";

// ─── Expanded Hinglish normalization ────────────────────────────────────────
const HINGLISH_NORMALIZATIONS: Array<[RegExp, string]> = [
  // Price / cost signals
  [/\bkitne?\s*mai(?:n)?\b/gi,          "kitne mein"],
  [/\bkitna\s*lagega\b/gi,              "price"],
  [/\bkitna\s*padega\b/gi,              "price"],
  [/\bkitna\s*hoga\b/gi,                "price"],
  [/\bkitna\s*paisa\b/gi,               "price"],
  [/\bkitne?\s*rupay[ae]?\b/gi,         "price"],
  [/\bkharcha\s*kitna\b/gi,             "price"],
  [/\bkharcha\b/gi,                     "kharcha price"],
  [/\bkya\s*rate\b/gi,                  "price rate"],
  [/\brate\s*kya\b/gi,                  "price rate"],
  [/\bceiling\s*ka\s*rate\b/gi,         "price"],
  [/\bwall\s*ka\s*rate\b/gi,            "price"],
  [/\brate\s*batao\b/gi,                "price batao"],
  [/\bkitna\s*ka\b/gi,                  "price"],
  [/\bpri[sz]e[sd]?\b/gi,               "price"],
  [/\bprizz\b/gi,                       "price"],
  [/\bquote\s*do\b/gi,                  "price quote"],
  [/\bestimate\s*do\b/gi,               "price estimate"],
  // Gypsum typos
  [/\bgypsom\b/gi,   "gypsum"],
  [/\bjepsam\b/gi,   "gypsum"],
  [/\bjisum\b/gi,    "gypsum"],
  [/\bgipsum\b/gi,   "gypsum"],
  [/\bjipsum\b/gi,   "gypsum"],
  [/\bgypsam\b/gi,   "gypsum"],
  [/\bgypzum\b/gi,   "gypsum"],
  [/\bgysum\b/gi,    "gypsum"],
  // PVC typos
  [/\bpv\s*c\b/gi,   "pvc"],
  [/\bpwc\b/gi,      "pvc"],
  [/\bpvs\b/gi,      "pvc"],
  // WPC typos
  [/\bwcc\b/gi,      "wpc"],
  [/\bwcp\b/gi,      "wpc"],
  // Ceiling Hindi words
  [/\bchhat\b/gi,    "ceiling"],
  [/\bchhath\b/gi,   "ceiling"],
  [/\bchhata\b/gi,   "ceiling"],
  [/\bchath\b/gi,    "ceiling"],
  [/\bsieling\b/gi,  "ceiling"],
  // Room Hindi words
  [/\bkamra\b/gi,    "room"],
  [/\bkamre\b/gi,    "room"],
  [/\brasoi\b/gi,    "kitchen"],
  [/\bbaithak\b/gi,  "hall"],
  [/\bdarbar\b/gi,   "hall"],
  [/\bsone\s*ka\s*kamra\b/gi, "bedroom"],
  // Visit booking
  [/\bvisit\s*book\b/gi,  "book visit"],
  [/\bghar\s*aao\b/gi,    "book visit"],
  [/\bghar\s*aana\b/gi,   "book visit"],
  [/\bbulao\b/gi,         "book visit"],
  // Common filler stripping
  [/\b(bhai|yaar|yar|bro|dost|yrr|yr|sir|madam|sahab|ji\b)\b/gi, ""],
];

// ─── Devanagari → Roman transliteration (expanded) ─────────────────────────
const DEVANAGARI_MAP: Array<[RegExp, string]> = [
  [/छत/g,        "ceiling"],
  [/दीवार/g,     "wall"],
  [/कमरा/g,      "room"],
  [/रेट/g,       "price rate"],
  [/कितना/g,     "price kitna"],
  [/बताओ/g,      "batao"],
  [/चाहिए/g,     "chahiye"],
  [/कितने/g,     "kitne"],
  [/लागत/g,      "price"],
  [/सस्ता/g,     "sasta"],
  [/मंहगा/g,     "mahanga"],
  [/महंगा/g,     "mahanga"],
  [/बुकिंग/g,    "booking"],
  [/विज़िट/g,    "visit"],
  [/बेडरूम/g,    "bedroom"],
  [/किचन/g,      "kitchen"],
  [/हॉल/g,       "hall"],
  [/बाथरूम/g,    "bathroom"],
  [/बालकनी/g,    "balcony"],
  [/अनुमान/g,    "estimate"],
  [/गारंटी/g,    "warranty guarantee"],
  [/वारंटी/g,    "warranty"],
  [/कीमत/g,      "price"],
  [/जिप्सम/g,    "gypsum"],
  [/पीवीसी/g,    "pvc"],
  [/संगमरमर/g,   "marble uv"],
  [/फर्श/g,      "flooring"],
  [/टीवी/g,      "tv unit"],
  [/डिज़ाइन/g,   "design"],
  [/इंटीरियर/g,  "interior"],
  [/नमस्ते/g,    "namaste"],
  [/नमस्कार/g,   "namaste"],
  [/धन्यवाद/g,   "thanks"],
  [/शुक्रिया/g,  "thanks"],
  [/हाँ/g,       "haan"],
  [/नहीं/g,      "nahi"],
  [/हां/g,       "haan"],
];

export function normalizeHinglish(text: string): string {
  let out = text.trim();
  // Apply Devanagari transliteration first
  for (const [re, val] of DEVANAGARI_MAP) out = out.replace(re, val);
  // Lowercase and clean punctuation
  out = out.toLowerCase();
  out = out.replace(/[?!.]{2,}/g, " ").replace(/\s+/g, " ").trim();
  // Apply Hinglish normalizations
  for (const [re, val] of HINGLISH_NORMALIZATIONS) out = out.replace(re, val);
  // Clean up extra spaces created by filler stripping
  out = out.replace(/\s{2,}/g, " ").trim();
  return out;
}

// ─── Intent detection ────────────────────────────────────────────────────────

const GREETING_RE = /^(hi|hello|hey|namaste|namaskar|hii+|helo|hlo|hy|hye|good\s*(morning|evening|afternoon)|salam|assalam|jai\s*hind|pranam|adaab|shubh\s*(prabhat|sandhya|din))[\s!.,]*$/i;

const AFFIRMATION_RE = /^(ha[na]?n?|haan|yes|okay|ok|bilkul|zaroor|sure|theek|thik|sahi|right|correct|perfect|done|proceed|ji\s*ha[na]n?|hnji|hn|hmm|achha|accha|acha|thik\s*hai|theek\s*hai)[\s!.,]*$/i;

const NEGATION_RE = /^(nahi|no|nope|mat|band\s*karo|ruk|stop|cancel|baad\s*mein|later|nahi\s*chahiye|rehne\s*do|chhod\s*do)[\s!.,]*$/i;

export function detectIntent(text: string): Intent {
  const t = normalizeHinglish(text);

  if (GREETING_RE.test(t.trim())) return "greeting";
  if (AFFIRMATION_RE.test(t.trim())) return "affirmation";
  if (NEGATION_RE.test(t.trim())) return "negation";

  // Booking / site visit — check before pricing
  if (/\b(book|booking|appointment|visit|site\s*visit|ghar\s*aao|aa\s*jao|bulao|milna|demo|consultation|schedule|free\s*visit|quotation\s*bhejo|quote\s*bhejo|estimate\s*bhejo|measurement|naap|naapne|aaiye|aao\s*na)\b/.test(t)) return "booking";

  // Pricing — explicit price signals
  if (/\b(price|pricing|rate|cost|kitna|lagega|lagta|budget|estimate|paisa|rupee|rs\b|₹|cheap|costly|expensive|affordable|how\s*much|kitne\s*mein|kitne\s*ka|total|charge|fee|sqft|per\s*(?:foot|sq)|kharcha|kharche|lagat|kimat|daam|estimate|quotation|quote)\b/.test(t)) return "pricing";

  // Comparison
  if (/\b(better|best|vs|versus|compare|differ|difference|konsa|kaun\s*sa|which\s*one|zyada|acha|bekar|suggest|recommend|ya\s*phir|mein\s*se)\b/.test(t) &&
    /\b(pvc|gypsum|wpc|uv|marble|ceiling|panel|wall|material|option)\b/.test(t)) return "comparison";

  // Catalog / design photos
  if (/\b(catalog|catalogue|design\s*(?:dekho|dikhao|bhejo|send|share)|brochure|pdf|photo\s*bhejo|photo\s*dikha|image\s*send|sample\s*photo|designs?\s*(?:list|collection|photo)|kaunse\s*design|latest\s*design)\b/.test(t)) return "view_catalog";

  // Book site visit (stricter)
  if (/\b(site\s*visit|ghar\s*(?:pe|par|aa|aao|bulao)|free\s*(?:visit|measurement|maap)|measurement\s*kab|naap\s*lena|visit\s*book|book\s*(?:a\s*)?visit|aao\s*ghar|aap\s*aao|kab\s*aao)\b/.test(t)) return "book_visit";

  // Material / service info
  if (/\b(gypsum|pvc|wpc|uv|marble|panel|ceiling|wall|floor|modular|tv\s*unit|wardrobe|kitchen|false\s*ceiling|design|texture|color|rang|finish|look|style|material|quality|thickness|durability|waterproof|fire|acoustic|soundproof|fluted|ribbed|grid|laminate|flooring|artificial\s*grass)\b/.test(t)) return "material_info";

  // FAQ / process / warranty
  if (/\b(guarantee|warranty|how\s*long|kitne\s*din|kitne\s*time|process|install|labor|worker|team|experience|kab\s*se|kitne\s*saal|review|feedback|trust|legit|real|fake|scam|safe|emi|payment|upi|cash|advance)\b/.test(t)) return "faq";

  // Off-topic
  if (/\b(cricket|ipl|football|movie|film|news|politics|election|weather|joke|meme|recipe|khana|game|song|music|gf|girlfriend|bf|love|date|shaadi|marriage|job|naukri|stock|share\s*market|crypto|bitcoin|coding|programming|ai|chatgpt)\b/.test(t)) return "off_topic";

  return "unknown";
}

export function isRepetitiveReply(newReply: string, previousAssistantReplies: string[]): boolean {
  const norm = newReply.trim().toLowerCase();
  for (const prevRaw of previousAssistantReplies.slice(-4)) {
    const prev = prevRaw.trim().toLowerCase();
    if (!prev || !norm) continue;
    if (prev === norm) return true;
    // Overlap check: >72% shared meaningful words = repetitive
    const prevWords = new Set(prev.split(/\s+/).filter((w) => w.length > 4));
    const newWords = norm.split(/\s+/).filter((w) => w.length > 4);
    if (newWords.length < 4) continue;
    const overlap = newWords.filter((w) => prevWords.has(w)).length;
    if (overlap / newWords.length > 0.72) return true;
  }
  return false;
}
