/**
 * Which language the assistant should answer in.
 *
 * JK Interior's customers are in Narpatganj, Forbesganj and Araria. Most of
 * them open the chat and type Hindi — either in Devanagari, or romanised
 * ("chhat ka rate kya hai"). Answering those messages in English is the single
 * fastest way to lose them, so the assistant mirrors whatever the visitor used.
 *
 * This is vocabulary, not business data: no fact about JK Interior lives here.
 * Deliberately free of React and of any import, because `api/chat.ts` pulls it
 * into the serverless function.
 */

export type ReplyLanguage = "hindi" | "hinglish" | "english"

/** Devanagari block — any character in it means the visitor typed Hindi script. */
const DEVANAGARI = /[ऀ-ॿ]/

/**
 * Romanised Hindi a customer here actually types. Function words and the
 * interior vocabulary they use, not a dictionary: each one is a word that
 * essentially never appears in an English sentence, so a single hit is enough.
 */
const HINGLISH_MARKERS = [
  // question words / verbs
  "kya", "kaise", "kaisa", "kaisi", "kitna", "kitne", "kitni", "kyun", "kyu", "kahan", "kab",
  "hai", "hain", "hoga", "hogi", "honge", "lagega", "lagegi", "lagta", "chahiye", "chaiye",
  "karna", "karni", "karwana", "karwani", "banwana", "banwani", "lagwana", "lagwani",
  "batao", "bataye", "bataiye", "dena", "denge", "milega", "milegi", "sakta", "sakte", "sakti",
  // pronouns / connectors
  "mera", "meri", "mere", "mujhe", "hamara", "hamari", "aapka", "aapki", "aapke", "apna",
  "aap", "hum", "nahi", "nahin", "haan", "acha", "accha", "theek", "thik", "abhi", "phir",
  "aur", "lekin", "matlab", "bhi", "sirf", "wala", "wali", "walo",
  // interior / trade vocabulary
  "chhat", "chat", "chhath", "kamra", "kamre", "ghar", "makan", "deewar", "diwar",
  "rasoi", "baithak", "chhoti", "chhota", "bada", "badi", "paisa", "paise", "rupaye",
  "hazar", "hajar", "lakh", "kaam", "mistri", "saman", "rate",
  // scheduling
  "din", "mahina", "baje", "subah", "sham", "kal", "aaj", "jaldi",
]

/**
 * `rate`, `hai` and `aur` are common enough as fragments that one alone is a
 * weak signal; everything above needs a whole-word match anyway, so the set is
 * kept small and the threshold stays at one confident hit.
 */
const AMBIGUOUS_MARKERS = new Set(["rate", "chat", "aur", "din", "bada", "hum", "aap"])

const WORD_RE = /[a-zऀ-ॿ]+/g

/**
 * The language a single message is written in.
 *
 * Devanagari wins outright. Otherwise the romanised markers decide: one
 * unambiguous marker, or two ambiguous ones, reads as Hinglish. Everything else
 * — including a bare "12x14" or "PVC" — is left as English so a one-word reply
 * never flips the conversation's language on its own.
 */
export function detectMessageLanguage(text: string): ReplyLanguage {
  if (DEVANAGARI.test(text)) return "hindi"

  const words = text.toLowerCase().match(WORD_RE) ?? []
  let strong = 0
  let weak = 0
  for (const word of words) {
    if (!HINGLISH_MARKERS.includes(word)) continue
    if (AMBIGUOUS_MARKERS.has(word)) weak++
    else strong++
  }
  return strong >= 1 || weak >= 2 ? "hinglish" : "english"
}

/**
 * The language to answer in, given this message and whatever the conversation
 * settled on earlier.
 *
 * Sticky on purpose: a visitor writing Hindi who then types just "12x14" or
 * "PVC" is still a Hindi conversation. Only a message that reads as a language
 * in its own right moves it, so the assistant never flip-flops mid-thread.
 */
export function resolveReplyLanguage(text: string, previous?: ReplyLanguage | null): ReplyLanguage {
  const detected = detectMessageLanguage(text)
  if (!previous) return detected
  // A neutral fragment ("12x14", "ok", "PVC") reads as English — keep what we had.
  if (detected === "english") return previous
  return detected
}

/** The instruction handed to the model for the language it has to answer in. */
export function languageInstruction(language: ReplyLanguage): string {
  switch (language) {
    case "hindi":
      return [
        "This visitor is writing in Hindi (Devanagari). Reply in Hindi, in Devanagari script.",
        "Keep the trade words people here actually say — PVC, gypsum, WPC, sq.ft, false ceiling —",
        "in their usual form rather than translating them. Write rupee figures as ₹1,200 and sizes",
        "as 12×14, never spelled out in words.",
      ].join(" ")
    case "hinglish":
      return [
        "This visitor is writing romanised Hindi (Hinglish). Reply the same way — Hindi words in",
        "Roman letters, the way a contractor from Narpatganj messages on WhatsApp. Do not switch to",
        "Devanagari and do not switch to full English. Keep trade words (PVC, gypsum, WPC, sq.ft)",
        "as they are, and write figures as ₹1,200 and sizes as 12×14.",
      ].join(" ")
    default:
      return "This visitor is writing in English. Reply in clear, plain English."
  }
}
