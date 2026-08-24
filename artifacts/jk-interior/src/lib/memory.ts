/**
 * JK Interior — Advanced Conversation Memory System
 *
 * Tracks every piece of context the customer has shared across the session:
 * name, city, budget, rooms (with size + material + estimates), preferences,
 * project type, booking interest, and conversation stage.
 *
 * Shared by client (jk-chat.tsx) and server (api/chat/route.ts) — zero side effects.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type ConversationStage =
  | "greeting"       // Initial message, no context yet
  | "discovery"      // Gathering project details
  | "consultation"   // Giving estimates and advice
  | "estimation"     // Working through pricing / room sizes
  | "booking"        // Ready to schedule / has given phone

export type RoomStatus = "mentioned" | "sized" | "estimated" | "confirmed"

export interface RoomContext {
  name: string            // "Hall", "Bedroom", "Kitchen", etc.
  size?: string           // "12×14"
  sqft?: number           // calculated area
  material?: string       // "Gypsum", "PVC", "WPC", etc.
  estimateRange?: string  // "₹11k–₹20k"
  requirements?: string   // "waterproof", "with LED cove", etc.
  status: RoomStatus
}

export interface ConversationMemory {
  // ── Identity ─────────────────────────────────────────────────────────────
  name?: string
  phone?: string
  city?: string

  // ── Budget ───────────────────────────────────────────────────────────────
  budgetRaw?: string    // raw text: "2 lakh", "50 hazar", "tight budget"
  budgetMin?: number    // in rupees (lower bound)
  budgetMax?: number    // in rupees (upper bound / best estimate)

  // ── Rooms ─────────────────────────────────────────────────────────────────
  rooms: RoomContext[]
  currentRoom?: string  // most recently discussed room

  // ── Preferences ──────────────────────────────────────────────────────────
  preferredStyle?: "modern" | "luxury" | "minimal" | "traditional" | "contemporary"
  preferredMaterial?: string

  // ── Project ───────────────────────────────────────────────────────────────
  projectType?: "single-room" | "multi-room" | "full-home"

  // ── Conversation state ────────────────────────────────────────────────────
  stage: ConversationStage
  topicHistory: string[]     // ordered list of topics discussed (last 15)
  askedFields: string[]      // fields we've already asked about — never ask again
  previousTopics: Record<string, boolean>

  // ── Latest estimate ───────────────────────────────────────────────────────
  latestEstimate?: string

  // ── Booking ───────────────────────────────────────────────────────────────
  bookingInterest: boolean

  // ── Meta ──────────────────────────────────────────────────────────────────
  messagesExchanged: number
  lastUpdated: number
}

// ─── Factory ──────────────────────────────────────────────────────────────────

export function createMemory(): ConversationMemory {
  return {
    rooms: [],
    stage: "discovery",
    topicHistory: [],
    askedFields: [],
    previousTopics: {},
    bookingInterest: false,
    messagesExchanged: 0,
    lastUpdated: Date.now(),
  }
}

// ─── Extraction ───────────────────────────────────────────────────────────────

/**
 * Extract information from a user (or bot) message and return a partial update.
 * Pure function — never mutates the existing memory.
 */
export function extractFromText(
  text: string,
  existing: ConversationMemory,
  source: "user" | "bot" = "user",
): Partial<ConversationMemory> {
  const t = text.toLowerCase()
  const updates: Partial<ConversationMemory> = {}

  // ── Budget ────────────────────────────────────────────────────────────────
  if (source === "user") {
    const lakhM = t.match(/(\d+(?:\.\d+)?)\s*(?:lakh|lac\b)/)
    const hzrM  = t.match(/(\d+(?:\.\d+)?)\s*(?:hazar|hajar|thousand|k\b)/)
    const rupM  = t.match(/₹\s*(\d+(?:\.\d+)?)/)

    if (lakhM && !existing.budgetRaw) {
      const val = parseFloat(lakhM[1]) * 100_000
      updates.budgetRaw = `₹${lakhM[1]} lakh`
      updates.budgetMin = Math.round(val * 0.8)
      updates.budgetMax = Math.round(val * 1.2)
    } else if (hzrM && !existing.budgetRaw) {
      const val = parseFloat(hzrM[1]) * 1_000
      updates.budgetRaw = `₹${hzrM[1]} hazar`
      updates.budgetMin = Math.round(val * 0.8)
      updates.budgetMax = Math.round(val * 1.2)
    } else if (rupM && parseFloat(rupM[1]) > 5000 && !existing.budgetRaw) {
      const val = parseFloat(rupM[1])
      updates.budgetRaw = `₹${val.toLocaleString("en-IN")}`
      updates.budgetMin = Math.round(val * 0.85)
      updates.budgetMax = Math.round(val * 1.15)
    }

    // Qualitative budget signals
    if (/\b(tight|kam\s*budget|low\s*budget|cheap|sasta|affordable|limited)\b/.test(t) && !existing.budgetRaw) {
      updates.budgetRaw = "low budget"
    }
  }

  // ── Style preference ──────────────────────────────────────────────────────
  if (source === "user" && !existing.preferredStyle) {
    if (/\b(premium|luxury|high[- ]end|royal|best\s*quality)\b/.test(t)) updates.preferredStyle = "luxury"
    else if (/\b(modern|contemporary|new[- ]style|trendy)\b/.test(t)) updates.preferredStyle = "modern"
    else if (/\b(simple|minimal|basic|sada|seedha)\b/.test(t)) updates.preferredStyle = "minimal"
    else if (/\b(traditional|classic|purana\s*style)\b/.test(t)) updates.preferredStyle = "traditional"
    else if (/\b(elegant|sophisticated|stylish)\b/.test(t)) updates.preferredStyle = "contemporary"
  }

  // ── Material preference ───────────────────────────────────────────────────
  if (source === "user") {
    if (/\bpvc\b/.test(t) && !existing.preferredMaterial) updates.preferredMaterial = "PVC"
    else if (/\bgypsum\b/.test(t) && !existing.preferredMaterial) updates.preferredMaterial = "Gypsum"
    else if (/\bwpc\b/.test(t) && !existing.preferredMaterial) updates.preferredMaterial = "WPC"
    else if (/\buv\b.*\bmarble\b|\bmarble\s*sheet\b/.test(t) && !existing.preferredMaterial) updates.preferredMaterial = "UV Marble"
  }

  // ── Room detection ────────────────────────────────────────────────────────
  const ROOM_PATTERNS: [RegExp, string][] = [
    [/\bhall\b|\bdrawing[\s-]room\b|\bliving[\s-]room\b|\bbaithak\b|\bdarbar\b|\blounge\b/, "Hall"],
    [/\bbedroom\b|\bbed[\s-]room\b|\bkamra\b|\bsone\s*ka\s*kamra\b/, "Bedroom"],
    [/\bkitchen\b|\brasoi\b|\brasoi\s*ghar\b/, "Kitchen"],
    [/\bbathroom\b|\btoilet\b|\bwashroom\b|\blatrine\b/, "Bathroom"],
    [/\boffice\b|\bcabin\b|\bworkplace\b/, "Office"],
    [/\bbalcony\b|\bbalkani\b|\bterrace\b/, "Balcony"],
    [/\bpooja\b|\bmandir\b|\bpuja\b/, "Pooja Room"],
    [/\bdining\b/, "Dining Room"],
    [/\bchildren[\s-]*room\b|\bkids[\s-]*room\b|\bnursery\b/, "Kids Room"],
    [/\bguest[\s-]*room\b|\bguest\s*bedroom\b/, "Guest Room"],
  ]

  if (source === "user") {
    const detectedNames: string[] = []
    for (const [pat, name] of ROOM_PATTERNS) {
      if (pat.test(t)) detectedNames.push(name)
    }

    if (detectedNames.length > 0) {
      const existingNames = new Set(existing.rooms.map(r => r.name))
      const updatedRooms = [...existing.rooms]

      for (const name of detectedNames) {
        if (!existingNames.has(name)) {
          updatedRooms.push({ name, status: "mentioned" })
          existingNames.add(name)
        }
      }

      if (updatedRooms.length !== existing.rooms.length) {
        updates.rooms = updatedRooms
      }

      // Always update currentRoom to most recently mentioned
      updates.currentRoom = detectedNames[detectedNames.length - 1]
    }
  }

  // ── Room size ─────────────────────────────────────────────────────────────
  if (source === "user") {
    const sizeM = t.match(/(\d+(?:\.\d+)?)\s*[x×*by]\s*(\d+(?:\.\d+)?)/)
    if (sizeM) {
      const targetRoom = updates.currentRoom ?? existing.currentRoom
      if (targetRoom) {
        const l = parseFloat(sizeM[1]), w = parseFloat(sizeM[2])
        const size = `${l}×${w}`
        const sqft = Math.round(l * w)
        const baseRooms = updates.rooms ?? [...existing.rooms]
        const idx = baseRooms.findIndex(r => r.name === targetRoom)
        const newRooms = [...baseRooms]
        if (idx >= 0) {
          newRooms[idx] = { ...newRooms[idx], size, sqft, status: "sized" }
        } else {
          newRooms.push({ name: targetRoom, size, sqft, status: "sized" })
        }
        updates.rooms = newRooms
      }
    }
  }

  // ── Extract estimate from bot reply ───────────────────────────────────────
  if (source === "bot") {
    const estM = text.match(/₹([\d,]+(?:\.\d+)?[k]?)\s*[–\-]\s*₹([\d,]+(?:\.\d+)?[k]?)/)
    if (estM) {
      const range = `₹${estM[1]}–₹${estM[2]}`
      updates.latestEstimate = range
      const targetRoom = existing.currentRoom
      if (targetRoom) {
        const baseRooms = [...existing.rooms]
        const idx = baseRooms.findIndex(r => r.name === targetRoom)
        if (idx >= 0 && baseRooms[idx].status !== "confirmed") {
          const newRooms = [...baseRooms]
          newRooms[idx] = { ...newRooms[idx], estimateRange: range, status: "estimated" }
          updates.rooms = newRooms
        }
      }
    }
  }

  // ── Project type ──────────────────────────────────────────────────────────
  if (source === "user") {
    const totalRooms = (updates.rooms ?? existing.rooms).length
    if (/\b(poora\s*ghar|pura\s*ghar|full\s*home|full\s*interior|complete\s*interior)\b/.test(t)) {
      updates.projectType = "full-home"
    } else if (/\b(2bhk|3bhk|4bhk|2\s*bhk|3\s*bhk)\b/.test(t) || totalRooms >= 3) {
      updates.projectType = "multi-room"
    } else if (totalRooms === 1 || /\b(ek\s*room|1\s*room|single\s*room|sirf\s*ek)\b/.test(t)) {
      updates.projectType = "single-room"
    }

    // Booking interest
    if (/\b(site[\s-]visit|book|visit\s*chahiye|measurement|bulao|aao|appointment|schedule)\b/.test(t)) {
      updates.bookingInterest = true
    }
  }

  return updates
}

// ─── Merge ────────────────────────────────────────────────────────────────────

/**
 * Merge a partial update into existing memory.
 * Never overwrites already-known fields with undefined.
 */
export function mergeMemory(
  existing: ConversationMemory,
  updates: Partial<ConversationMemory>,
  incrementMessages = false,
): ConversationMemory {
  return {
    ...existing,
    ...updates,
    // Identity — never overwrite with undefined
    name:    updates.name    ?? existing.name,
    phone:   updates.phone   ?? existing.phone,
    city:    updates.city    ?? existing.city,
    // Budget — only update if new info
    budgetRaw: updates.budgetRaw ?? existing.budgetRaw,
    budgetMin: updates.budgetMin ?? existing.budgetMin,
    budgetMax: updates.budgetMax ?? existing.budgetMax,
    // Preferences — keep once set
    preferredStyle:    updates.preferredStyle    ?? existing.preferredStyle,
    preferredMaterial: updates.preferredMaterial ?? existing.preferredMaterial,
    // Rooms — always use merged version
    rooms:       updates.rooms       ?? existing.rooms,
    currentRoom: updates.currentRoom ?? existing.currentRoom,
    // Project
    projectType: updates.projectType ?? existing.projectType,
    // Booking — once true, stays true
    bookingInterest: updates.bookingInterest || existing.bookingInterest,
    // Latest estimate
    latestEstimate: updates.latestEstimate ?? existing.latestEstimate,
    // Meta
    messagesExchanged: incrementMessages
      ? existing.messagesExchanged + 1
      : existing.messagesExchanged,
    lastUpdated: Date.now(),
    // Merge askedFields (no duplicates)
    askedFields: updates.askedFields
      ? Array.from(new Set([...existing.askedFields, ...updates.askedFields]))
      : existing.askedFields,
    // Topic history — prepend new, cap at 15
    topicHistory: updates.topicHistory
      ? Array.from(new Set([...updates.topicHistory, ...existing.topicHistory])).slice(0, 15)
      : existing.topicHistory,
    // Previous topics merge
    previousTopics: { ...existing.previousTopics, ...updates.previousTopics },
  }
}

// ─── Stage Updater ────────────────────────────────────────────────────────────

export function updateStage(memory: ConversationMemory): ConversationStage {
  if (memory.bookingInterest && memory.phone) return "booking"
  if (memory.bookingInterest || memory.rooms.some(r => r.status === "estimated")) return "estimation"
  if (memory.rooms.some(r => r.size) || memory.budgetRaw) return "consultation"
  if (memory.name || memory.city || memory.rooms.length > 0) return "discovery"
  return "greeting"
}

// ─── Prompt Summarizer ────────────────────────────────────────────────────────

/**
 * Generate a structured text block for Gemini's system prompt.
 * Tells the model everything it needs to personalize responses.
 */
export function summarizeForPrompt(memory: ConversationMemory): string {
  // Don't pad empty memory
  if (memory.messagesExchanged === 0 && !memory.name && !memory.city && memory.rooms.length === 0) {
    return ""
  }

  const lines: string[] = [
    "--- CONVERSATION MEMORY (mandatory context) ---",
  ]

  // Identity
  const id: string[] = []
  if (memory.name)  id.push(`Name: ${memory.name}`)
  if (memory.phone) id.push(`Phone: ${memory.phone} ✓`)
  if (memory.city)  id.push(`City: ${memory.city}`)
  if (id.length > 0) lines.push(id.join(" | "))

  // Budget
  if (memory.budgetRaw) {
    const lo = memory.budgetMin ? `₹${Math.round(memory.budgetMin / 1000)}k` : ""
    const hi = memory.budgetMax ? `₹${Math.round(memory.budgetMax / 1000)}k` : ""
    lines.push(`Budget: ${memory.budgetRaw}${lo && hi ? ` (~${lo}–${hi})` : ""}`)
  }

  // Preferences
  if (memory.preferredStyle)    lines.push(`Style: ${memory.preferredStyle}`)
  if (memory.preferredMaterial) lines.push(`Material preference: ${memory.preferredMaterial}`)
  if (memory.projectType)       lines.push(`Project scope: ${memory.projectType}`)

  // Rooms
  if (memory.rooms.length > 0) {
    lines.push("")
    lines.push("ROOMS:")
    for (const room of memory.rooms) {
      const parts = [`• ${room.name}`]
      if (room.size)          parts.push(`(${room.size}${room.sqft ? `, ${room.sqft} sqft` : ""})`)
      if (room.material)      parts.push(`— ${room.material}`)
      if (room.requirements)  parts.push(`[${room.requirements}]`)
      if (room.estimateRange) parts.push(`→ estimate given: ${room.estimateRange} ✓`)
      parts.push(`[${room.status}]`)
      lines.push(parts.join(" "))
    }
  }

  if (memory.currentRoom)    lines.push(`\nActive room: ${memory.currentRoom}`)
  if (memory.latestEstimate) lines.push(`Last estimate: ${memory.latestEstimate}`)

  // DO NOT ASK section — critical for avoiding repetition
  const neverAsk: string[] = []
  if (memory.name)   neverAsk.push("name (already have it)")
  if (memory.phone)  neverAsk.push("phone (already have it)")
  if (memory.city)   neverAsk.push("city (already have it)")
  if (memory.budgetRaw) neverAsk.push("budget (already have it)")
  const sizedRooms = memory.rooms.filter(r => r.size)
  sizedRooms.forEach(r => neverAsk.push(`${r.name} size (already: ${r.size})`))
  const estimatedRooms = memory.rooms.filter(r => r.estimateRange)
  estimatedRooms.forEach(r => neverAsk.push(`${r.name} estimate (already given: ${r.estimateRange})`))

  if (neverAsk.length > 0) {
    lines.push("")
    lines.push("NEVER ASK AGAIN:")
    neverAsk.forEach(f => lines.push(`✗ ${f}`))
  }

  lines.push(`Stage: ${memory.stage} | Messages: ${memory.messagesExchanged}`)
  lines.push("---")

  return lines.join("\n")
}

// ─── Persistence helpers (client-side only) ──────────────────────────────────

const MEMORY_KEY = "jk_memory_v1"

export function loadMemory(): ConversationMemory {
  if (typeof window === "undefined") return createMemory()
  try {
    const raw = localStorage.getItem(MEMORY_KEY)
    if (!raw) return createMemory()
    const parsed = JSON.parse(raw) as ConversationMemory
    // Migrate or reset stale memory (older than 24 hours)
    if (!parsed.lastUpdated || Date.now() - parsed.lastUpdated > 24 * 60 * 60 * 1000) {
      return createMemory()
    }
    // Ensure arrays exist (guard against old schema)
    if (!Array.isArray(parsed.rooms)) parsed.rooms = []
    if (!Array.isArray(parsed.topicHistory)) parsed.topicHistory = []
    if (!Array.isArray(parsed.askedFields)) parsed.askedFields = []
    if (!parsed.previousTopics) parsed.previousTopics = {}
    return parsed
  } catch {
    return createMemory()
  }
}

export function saveMemory(memory: ConversationMemory): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(MEMORY_KEY, JSON.stringify(memory))
  } catch {
    // quota exceeded or private mode — silently ignore
  }
}

export function clearMemory(): void {
  if (typeof window === "undefined") return
  try { localStorage.removeItem(MEMORY_KEY) } catch {}
}
