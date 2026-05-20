export type Role    = "bot" | "user"
export type MsgKind = "text" | "card"
export type Message = { id: number; role: Role; text: string; kind?: MsgKind; cardData?: LeadCard }
export type ConvMsg = { role: "user" | "assistant"; content: string }
export type Lead    = { name: string; phone: string; city?: string; service?: string }
export type LeadCard = Lead & { timestamp: string; estimate?: string; preferredTime?: string }

export const WA_NUMBER   = "918651070831"
export const CALL_NUMBER = "+918651070831"
export const AREAS       = ["Forbesganj", "Araria", "Jogbani", "Raniganj", "Narpatganj", "Kursakanta", "Tribeniganj", "Chhatapur", "Supaul", "Purnia"]
