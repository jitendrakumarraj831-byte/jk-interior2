/**
 * Human Handoff Engine
 * Gracefully transfers complex conversations to human agents
 * Detects when bot should escalate and prepares context for handoff
 */

import { ConversationContext } from './consultant-engine.js'

export type HandoffReason = 
  | 'complexity_too_high'
  | 'repeated_confusion'
  | 'custom_request'
  | 'negotiation_needed'
  | 'technical_issue'
  | 'user_request'
  | 'high_value_lead'

export interface HandoffContext {
  reason: HandoffReason
  confidence: number  // 0-1: how certain we are about handoff decision
  summary: string     // Quick summary for agent
  leadData: {
    name?: string
    phone?: string
    city?: string
    service?: string
    roomSize?: string
    budget?: string
    estimate?: string
  }
  conversationSummary: string
  suggestedNextStep: string
  timestamp: string
}

/**
 * Detect if conversation should be handed off to human
 */
export function shouldHandoffToHuman(
  input: string,
  context: ConversationContext,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>
): { shouldHandoff: boolean; reason?: HandoffReason; confidence?: number } {
  
  // ════════════════════════════════════════════════════════════
  // 1. REPEATED CONFUSION - User asking same thing 3+ times
  // ════════════════════════════════════════════════════════════
  const lastThreeMessages = conversationHistory.slice(-6).filter(m => m.role === 'user');
  if (lastThreeMessages.length >= 3) {
    const similarity = checkMessageSimilarity(lastThreeMessages.map(m => m.content));
    if (similarity > 0.8) {
      return { 
        shouldHandoff: true, 
        reason: 'repeated_confusion',
        confidence: 0.95
      };
    }
  }

  // ════════════════════════════════════════════════════════════
  // 2. USER EXPLICITLY ASKS FOR HUMAN
  // ════════════════════════════════════════════════════════════
  if (/\bhuman\b|\bperson\b|\bagent\b|\bteam\b|\bmanager\b|\bspeaker\b|\bbaatna\s*hai\b|\bkisi\s*se\b|\bdirect\s*baat\b/i.test(input)) {
    return {
      shouldHandoff: true,
      reason: 'user_request',
      confidence: 0.95
    };
  }

  // ════════════════════════════════════════════════════════════
  // 3. HIGH VALUE LEAD - Multiple data points + urgency
  // ════════════════════════════════════════════════════════════
  const isHighValue = context.name && context.phone && context.city && 
                      context.service && context.roomSize &&
                      context.messagesExchanged > 8;
  const isUrgent = /\bjaldi\b|\babhi\b|\bkal\s*tak\b|\baaj\s*tak\b/i.test(input);
  
  if (isHighValue && isUrgent) {
    return {
      shouldHandoff: true,
      reason: 'high_value_lead',
      confidence: 0.85
    };
  }

  // ════════════════════════════════════════════════════════════
  // 4. CUSTOM REQUEST - Something outside normal services
  // ════════════════════════════════════════════════════════════
  if (/\bcustom\b|\bspecial\b|\bunique\b|\bmodified\b|\bchange\s*kar\s*sakte\b|\bkya\s*kar\s*sakte\b/i.test(input)) {
    return {
      shouldHandoff: true,
      reason: 'custom_request',
      confidence: 0.8
    };
  }

  // ════════════════════════════════════════════════════════════
  // 5. NEGOTIATION SIGNAL - User wants discount/special deal
  // ════════════════════════════════════════════════════════════
  if (/\bdiscount\b|\bchhut\b|\boffer\b|\bkam\s*kar\b|\bsaste\s*mein\b|\bbargain\b/i.test(input)) {
    // Only if we've already discussed pricing
    if (context.lastTopic || context.service) {
      return {
        shouldHandoff: true,
        reason: 'negotiation_needed',
        confidence: 0.75
      };
    }
  }

  // ════════════════════════════════════════════════════════════
  // 6. TECHNICAL ISSUE - Something broken/damaged
  // ════════════════════════════════════════════════════════════
  if (/\bdamage\b|\bbreak\b|\btoot\s*gaya\b|\bleak\b|\bproblem\b|\tissue\b|\bthik\s*karna\b/i.test(input)) {
    return {
      shouldHandoff: true,
      reason: 'technical_issue',
      confidence: 0.85
    };
  }

  // ════════════════════════════════════════════════════════════
  // 7. COMPLEXITY TOO HIGH - Message length > 200 chars
  // ════════════════════════════════════════════════════════════
  if (input.length > 200) {
    return {
      shouldHandoff: true,
      reason: 'complexity_too_high',
      confidence: 0.7
    };
  }

  return { shouldHandoff: false };
}

/**
 * Generate context summary for human agent
 */
export function generateHandoffSummary(
  context: ConversationContext,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>,
  reason: HandoffReason
): HandoffContext {
  // Extract key information
  const leadData = {
    name: context.name,
    phone: context.phone,
    city: context.city,
    service: context.service,
    roomSize: context.roomSize,
    budget: context.budget,
    estimate: context.estimateGiven,
  };

  // Create summary based on reason
  let summary = '';
  let suggestedNextStep = '';

  switch (reason) {
    case 'high_value_lead':
      summary = `🔥 HOT LEAD - Customer is urgent and has provided all details`;
      suggestedNextStep = `Call immediately - customer wants ${context.service} in ${context.city}. Size: ${context.roomSize}. Ready to book.`;
      break;

    case 'repeated_confusion':
      summary = `Customer confused or frustrated - asked same question multiple times`;
      suggestedNextStep = `Speak directly to clarify their needs. May need custom solution.`;
      break;

    case 'user_request':
      summary = `Customer explicitly requested to speak with someone`;
      suggestedNextStep = `Connect them to sales team immediately`;
      break;

    case 'negotiation_needed':
      summary = `Customer wants discount or special pricing`;
      suggestedNextStep = `Discuss pricing flexibility. Authority to give 5-10% discount if needed.`;
      break;

    case 'custom_request':
      summary = `Customer has special/custom requirements`;
      suggestedNextStep = `Understand exact requirements, may need site visit`;
      break;

    case 'technical_issue':
      summary = `Customer reporting damage/issue with existing installation`;
      suggestedNextStep = `Check warranty status. Schedule inspection if within warranty.`;
      break;

    case 'complexity_too_high':
      summary = `Complex query that needs expert attention`;
      suggestedNextStep = `Get more details and formulate custom proposal`;
      break;
  }

  // Build conversation summary (last 5 exchanges)
  const recentExchanges = conversationHistory.slice(-10);
  let conversationSummary = '';
  for (const msg of recentExchanges) {
    const label = msg.role === 'user' ? 'Customer' : 'Bot';
    conversationSummary += `${label}: ${msg.content}\n`;
  }

  return {
    reason,
    confidence: 0.8,
    summary,
    leadData,
    conversationSummary,
    suggestedNextStep,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Generate response to user when handing off to human
 */
export function getHandoffMessage(reason: HandoffReason, context: ConversationContext): string {
  const name = context.name ? ` ${context.name} ji` : '';

  const messages: Record<HandoffReason, string> = {
    high_value_lead: 
      `Bilkul${name}! आपका request बहुत important है। मैं सीधे हमारे team को connect करती हूँ।\n\n📞 **Riya का team** अभी आपसे बात करेगा:\n\n📱 WhatsApp: +91 8651070831\n☎️ Call: +91 8651070831\n\nआपकी जानकारी उनको भेज दी है - immediate follow-up होगा! 💪`,

    repeated_confusion:
      `${name}, क्षमा करें अगर मैं सही समझ नहीं पाई। मेरे team को direct बात करने दीजिए - वो सब कुछ आसा��� कर देंगे.\n\n📱 WhatsApp: +91 8651070831\n☎️ Direct Call: +91 8651070831\n\nया message करो - "Riya से baat karni hai" 🙏`,

    user_request:
      `Bilkul${name}! हमारे team को connect करती हूँ अभी ही।\n\n📱 **WhatsApp करो:** +91 8651070831\n☎️ **या call करो:** +91 8651070831\n\nWait मत करो - team immediately available है! ⚡`,

    negotiation_needed:
      `${name}, pricing के लिए हमारे sales team से बात करो - वो तुम्हारे लिए best offer दे सकते हैं। 💰\n\n📱 WhatsApp: +91 8651070831\n\nSpecial discounts available हैं multiple rooms के लिए! 🎁`,

    custom_request:
      `${name}, तुम्हारी special requirement को अच्छे से समझने के लिए expert से बात करनी चाहिए।\n\n📱 WhatsApp: +91 8651070831\n\nTeam तुम्हारे साथ custom solution design करेगा! 🎨`,

    technical_issue:
      `${name}, इस समस्या को solve करने के लिए हमारा technical team contact करो।\n\n📱 WhatsApp: +91 8651070831\n☎️ Call: +91 8651070831\n\nWarranty check करके solution देंगे! 🔧`,

    complexity_too_high:
      `${name}, तुम्हारी detailed inquiry के लिए शुक्रिया! हमारे expert team तुम्हें best solution देगा।\n\n📱 WhatsApp करो: +91 8651070831\n\nDetailed proposal तैयार करेंगे! 📋`,
  };

  return messages[reason] || messages.user_request;
}

/**
 * Helper: Check similarity between messages (to detect repetition)
 */
function checkMessageSimilarity(messages: string[]): number {
  if (messages.length < 2) return 0;

  let totalSimilarity = 0;
  let comparisons = 0;

  for (let i = 0; i < messages.length - 1; i++) {
    const msg1 = messages[i].toLowerCase().replace(/[^a-z0-9\s]/g, '');
    const msg2 = messages[i + 1].toLowerCase().replace(/[^a-z0-9\s]/g, '');

    const words1 = new Set(msg1.split(/\s+/));
    const words2 = new Set(msg2.split(/\s+/));

    const intersection = new Set([...words1].filter(w => words2.has(w)));
    const union = new Set([...words1, ...words2]);

    const similarity = intersection.size / union.size;
    totalSimilarity += similarity;
    comparisons++;
  }

  return comparisons > 0 ? totalSimilarity / comparisons : 0;
}

export default {
  shouldHandoffToHuman,
  generateHandoffSummary,
  getHandoffMessage,
};
