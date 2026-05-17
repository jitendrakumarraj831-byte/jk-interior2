import { SERVICE_CATALOG } from '@/lib/business-data'
import { BUSINESS, CITIES, SERVICES_LIST, SITE_URL } from '@/lib/seo'
import type { ConversationContext } from '@/lib/consultant-engine'

export interface ChatMetadata {
  quickReplies: string[]
  suggestedActions: Array<'call' | 'whatsapp' | 'lead'>
  leadReady: boolean
}

const serviceSummary = SERVICE_CATALOG.map((service) => {
  const waterproof = service.waterproof ? 'waterproof' : 'not waterproof / dry-area focused'
  return `- ${service.name}: ${service.priceRange}; ${service.highlights}; best for ${service.bestFor}; ${waterproof}; keywords: ${service.keywords.join(', ')}`
}).join('\n')

const citySummary = CITIES.map((city) => `${city.name} (${city.district}, ${city.distance})`).join(', ')

const faqSummary = CITIES.flatMap((city) =>
  city.faqs.slice(0, 2).map((faq) => `- ${city.name}: Q: ${faq.q} A: ${faq.a}`)
).join('\n')

export const WEBSITE_KNOWLEDGE_CONTEXT = `
JK Interior website knowledge base:
- Website: ${SITE_URL}
- Business: ${BUSINESS.name} / ${BUSINESS.nameHi}; ${BUSINESS.tagline}; founded ${BUSINESS.founded}
- Address: ${BUSINESS.address.street}, ${BUSINESS.address.city}, ${BUSINESS.address.district}, ${BUSINESS.address.state} ${BUSINESS.address.postalCode}
- Contact: ${BUSINESS.phone1}, ${BUSINESS.phone2}; WhatsApp: +${BUSINESS.whatsapp}; Email: ${BUSINESS.email}
- Hours: ${BUSINESS.hours}; site visit is free; pricing is transparent; payment can be cash, UPI, or bank transfer.
- Main services from website: ${SERVICES_LIST.join(', ')}
- Service areas: ${citySummary}

Service/pricing/material knowledge:
${serviceSummary}

High-value city FAQs from website:
${faqSummary}
`.trim()

export function buildWebsiteAwareSystemPrompt(basePrompt: string, ctx?: ConversationContext): string {
  const known = [
    ctx?.name ? `Known customer name: ${ctx.name}` : '',
    ctx?.phone ? `Known phone: ${ctx.phone}` : '',
    ctx?.city ? `Known city: ${ctx.city}` : '',
    ctx?.service ? `Known service: ${ctx.service}` : '',
    ctx?.roomSize ? `Known room size: ${ctx.roomSize}` : '',
    ctx?.roomType ? `Known room type: ${ctx.roomType}` : '',
    ctx?.budget ? `Known budget: ${ctx.budget}` : '',
  ].filter(Boolean).join('\n')

  return `${basePrompt}

--- COMPLETE WEBSITE CONTEXT ---
${WEBSITE_KNOWLEDGE_CONTEXT}

--- CURRENT CONVERSATION MEMORY ---
${known || 'No confirmed customer details yet.'}

--- RESPONSE QUALITY RULES ---
- Reply as “JK Interior Assistant”, a premium but friendly interior consultant.
- Understand Hindi, English, Hinglish, and spelling mistakes.
- Keep replies short: 3-6 mobile-friendly lines unless the user asks for details.
- Use website facts and service/pricing ranges above. Do not invent prices outside the known ranges.
- If user asks price and room size is known, calculate or give a practical estimate; otherwise ask only for room size.
- For wet areas like kitchen/bathroom/balcony, confidently suggest PVC ceiling and UV marble/waterproof wall solutions.
- For hall/bedroom premium look, suggest gypsum ceiling, WPC/fluted accent wall, and LED cove lighting.
- If user is serious, collect one lead detail at a time: name → city → phone.
- Never return an empty answer. If unsure, give a safe helpful answer and suggest free site visit/call/WhatsApp.`
}

export function cleanAssistantReply(reply: string): string {
  const normalized = reply
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^[\s"']+|[\s"']+$/g, '')
    .trim()

  if (!normalized) {
    return 'Main help karne ke liye ready hoon. Aap room type aur size bataiye — exact estimate nikaal deta hoon. 📐'
  }

  if (/^(i don'?t know|sorry,? i don'?t know|unknown)$/i.test(normalized)) {
    return 'Iske liye best hoga ek free site visit. Aap room ka size aur city bataiye, JK Interior team exact suggestion aur quote de degi. 📞 +91 8651070831'
  }

  return normalized.slice(0, 1200)
}

export function getChatMetadata(ctx: ConversationContext): ChatMetadata {
  const quickReplies = new Set<string>()

  if (!ctx.service && !ctx.lastTopic) {
    quickReplies.add('PVC Ceiling Rate')
    quickReplies.add('Gypsum vs PVC')
    quickReplies.add('Wall Panel Design')
    quickReplies.add('Free Site Visit')
  }

  if (ctx.lastIntent === 'pricing' || ctx.roomSize) {
    quickReplies.add('Book Site Visit')
    quickReplies.add('WhatsApp Now')
    quickReplies.add('Compare Materials')
  }

  if (ctx.lastTopic === 'pvc') {
    quickReplies.add('12x14 PVC estimate')
    quickReplies.add('PVC waterproof hai?')
    quickReplies.add('Call Now')
  }

  if (ctx.lastTopic === 'gypsum') {
    quickReplies.add('Gypsum LED design')
    quickReplies.add('Gypsum rate')
    quickReplies.add('Book Site Visit')
  }

  if (ctx.lastTopic === 'wpc' || ctx.lastTopic === 'fluted') {
    quickReplies.add('TV wall estimate')
    quickReplies.add('WPC color options')
    quickReplies.add('WhatsApp Now')
  }

  if (!ctx.phone) {
    quickReplies.add('Call me back')
  }

  quickReplies.add('Contact Details')

  const leadReady = Boolean(ctx.phone && (ctx.name || ctx.city || ctx.service || ctx.roomSize))
  const suggestedActions: ChatMetadata['suggestedActions'] = ['call', 'whatsapp']
  if (!leadReady) suggestedActions.push('lead')

  return {
    quickReplies: Array.from(quickReplies).slice(0, 6),
    suggestedActions,
    leadReady,
  }
}

export function getWebsiteKnowledgeReply(message: string, ctx?: ConversationContext): string | null {
  const text = message.toLowerCase()
  const askSize = ctx?.roomSize ? `Aapka ${ctx.roomSize} size noted hai — exact design ke hisaab se final quote milega.` : 'Wall/room ka size bataiye, main rough estimate guide kar dunga.'

  if (/\bcharcoal\b|charcol|charcole/.test(text)) {
    return `Charcoal panel premium decorative wall panel hota hai — TV wall, bedroom back wall, reception aur feature wall ke liye beautiful option.\n\nIska rate design, thickness aur finish par depend karta hai. ${askSize}\n\nFree sample/design options ke liye WhatsApp: ${BUSINESS.phone1}`
  }

  if (/\blouver|louvers|fluted|ribbed|3d\s*panel/.test(text)) {
    return `Louvers / fluted panels modern 3D wall look dete hain — TV unit, bedroom, office reception aur accent wall ke liye best.\n\nWebsite rate guide: ₹200–₹500/sq.ft, premium WPC fluted designs higher ho sakte hain. ${askSize}`
  }

  if (/\bpop\b|plaster\s*of\s*paris/.test(text)) {
    return `POP/Gypsum ceiling hall aur bedroom ke premium look ke liye best hai — smooth finish, cove lighting aur custom design possible.\n\nGypsum guide: ₹80–₹140/sq.ft; LED cove design ₹120–₹200/sq.ft tak ja sakta hai. Room size bataiye, estimate nikaal deta hoon.`
  }

  if (/\bbedroom|bed\s*room|kamra/.test(text) && /design|interior|ceiling|panel|idea/.test(text)) {
    return `Bedroom ke liye JK Interior usually gypsum ceiling + soft LED cove + WPC/fluted headboard wall suggest karta hai.\n\nAgar budget friendly chahiye to PVC ceiling + UV marble/WPC accent wall bhi accha option hai. Bedroom size kya hai?`
  }

  if (/\boffice|shop|showroom|reception/.test(text)) {
    return `Office/shop ke liye grid ceiling, PVC ceiling, WPC reception wall, glass/partition styling aur modular storage practical options hain.\n\nCommercial work fast installation aur low-maintenance material ke saath hota hai. Area size aur city bataiye, quote guide kar deta hoon.`
  }

  if (/\bmodular|tv\s*(unit|panel|wall|cabinet)|storage|cabinet/.test(text)) {
    return `Modular TV unit custom design hota hai — storage, cable hiding, LED backlight aur premium wall panel finish ke saath.\n\nWebsite guide: ₹15,000–₹60,000+ depending on size, material and design. Wall width ya photo WhatsApp par bhej sakte hain.`
  }

  if (/\boffer|discount|combo|package|deal/.test(text)) {
    return `Complete interior package mein ceiling + wall panel + TV unit + flooring par combo pricing possible hoti hai.\n\nBest offer exact measurement ke baad milta hai — free site visit book kar dein? WhatsApp/Call: ${BUSINESS.phone1}`
  }

  if (/\bcontact|phone|mobile|number|call|whatsapp|address|location/.test(text)) {
    return `JK Interior contact details:\n\n📞 ${BUSINESS.phone1}\n📞 ${BUSINESS.phone2}\n📍 ${BUSINESS.address.street}, ${BUSINESS.address.city}, ${BUSINESS.address.district}, Bihar\n⏰ ${BUSINESS.hours}`
  }

  if (/\barea|city|service\s*area|forbesganj|araria|purnia|jogbani|supaul|narpatganj|raniganj/.test(text)) {
    return `Hum Forbesganj, Araria, Jogbani, Raniganj, Narpatganj, Kursakanta, Tribeniganj, Chhatapur, Supaul, Purnia aur nearby Bihar areas mein service dete hain.\n\nAapki city ka naam bataiye, availability confirm kar deta hoon.`
  }

  return null
}
