# JK Interior Chatbot Logic Enhancements

## Current Architecture Overview

**Two-Layer System:**
1. **Local Rule/Keyword Engine** (`consultant-engine.ts`) - Fast, rule-based pattern matching
2. **Groq LLM Fallback** (`context-engine.ts`) - Optional AI responses for complex queries

**Context Management:**
- Session-based conversation tracking
- Intent detection (greeting, pricing, booking, material_info, etc.)
- Hinglish normalization for Indian English variants
- Lead context preservation

---

## Identified Gaps & Improvements

### 1. **Enhanced Intent Detection**
**Current Issue:** Limited intent precision; doesn't distinguish between related queries well

**Improvements:**
- Add sub-intents for pricing (e.g., `pricing:comparison`, `pricing:budget`, `pricing:urgent`)
- Detect urgency signals ("jaldi", "abhi", "asap")
- Distinguish between exploration (browsing) vs. decision-making (ready to book)
- Track user confidence level (exploring vs. ready to commit)

**Implementation:**
```typescript
type PricingSubIntent = 'comparison' | 'budget' | 'urgent' | 'detailed' | 'quick_estimate';
type UserConfidence = 'exploring' | 'interested' | 'ready_to_book' | 'negotiating';

// Enhanced intent detection
export function detectEnhancedIntent(text: string, context: FollowUpContext): {
  primary: Intent;
  secondary?: string;
  urgency: 'low' | 'medium' | 'high';
  confidence: UserConfidence;
}
```

---

### 2. **Smarter Context Preservation**
**Current Issue:** Context resets on ambiguous messages; doesn't track decision tree position

**Improvements:**
- Add conversation flow state machine
- Track which information is "confirmed" vs. "tentative"
- Remember partial leads (name without phone, city without service choice)
- Detect when user backtracks or changes mind

**Implementation:**
```typescript
interface ConversationState {
  stage: 'greeting' | 'discovery' | 'consultation' | 'estimation' | 'negotiation' | 'booking_final';
  confirmedData: {
    name?: string;      // ✓ confirmed
    phone?: string;     // ✓ confirmed
    city?: string;      // ✓ confirmed
    service?: string;   // ✓ confirmed
    roomSize?: string;  // ✓ confirmed
  };
  tentativeData: {
    // User mentioned but not yet confirmed
  };
  lastQuestion: string;  // Exact question asked for context
  expectedReplyType: 'dimensions' | 'yes_no' | 'material_choice' | 'phone' | 'name' | 'open';
}
```

---

### 3. **Improved Lead Qualification**
**Current Issue:** Treats all leads equally; doesn't score or prioritize

**Enhancements:**
- Add lead scoring (hot/warm/cold based on engagement depth)
- Calculate conversion probability
- Detect objection patterns and suggest rebuttals
- Track question-to-close rate

**Implementation:**
```typescript
interface LeadScore {
  temperature: 'cold' | 'warm' | 'hot';     // Based on engagement
  readiness: 0-100;                          // 0=exploring, 100=ready to sign
  objections: string[];                      // "price concern", "material_doubt"
  nextBestAction: string;                    // "send_catalog", "offer_discount", "schedule_call"
}
```

---

### 4. **Hinglish & Regional Variations**
**Current Issue:** Limited variant handling; misses colloquial terms

**Improvements:**
- Expand Hinglish normalization dictionary (common misspellings)
- Add regional dialect support (Bihar-specific terms)
- Handle typos and phonetic variations
- Support Devanagari script input if applicable

**Implementation:**
```typescript
const HINGLISH_VARIANTS = {
  // Pricing variants
  'kitne ka': 'kitna lagega',
  'kitne mein': 'kitna lagega',
  'bhao': 'price',
  'rate': 'price',
  
  // Material variants
  'jepsum': 'gypsum',
  'gypsam': 'gypsum',
  'pee vee see': 'pvc',
  
  // Regional Bihar terms
  'chalenge': 'ok',
  'garma': 'quality',
  'sasta': 'budget',
};
```

---

### 5. **Better Fallback Handling**
**Current Issue:** When local engine fails, jumps to LLM without exhausting local rules

**Improvements:**
- Add confidence scoring to rules
- Implement graceful degradation (ask clarifying question before LLM)
- Cache LLM responses for similar queries
- Add response validation (reject hallucinated prices)

**Implementation:**
```typescript
interface RuleMatch {
  pattern: RegExp;
  handler: (text: string, context: FollowUpContext) => string;
  confidence: 0-1;        // How certain is this rule?
  tags: string[];         // For analytics
  fallback?: string;      // Graceful fallback if user denies this match
}

// Before calling Groq:
if (bestLocalMatch.confidence < 0.6) {
  // Ask clarifying question instead of jumping to LLM
  return askClarification(userMessage, context);
}
```

---

### 6. **Multi-Turn Conversational Memory**
**Current Issue:** Limited memory of conversation arc; repeats questions

**Improvements:**
- Track 10+ previous messages (current: last 12)
- Identify conversation peaks (when user showed highest interest)
- Detect repetitive patterns (user asked same thing 3x → escalate to human)
- Memorize personal preferences shown in chat

**Implementation:**
```typescript
interface ConversationMemory {
  messageCount: number;
  peakInterestPoint: {
    messageIndex: number;
    service: string;
    estimatedBudget: number;
  };
  topicsVisited: { topic: string; frequency: number }[];
  repetitionAlerts: { question: string; count: number }[];
}
```

---

### 7. **Service-Specific Logic**
**Current Issue:** Generic responses don't address service-specific concerns

**Improvements:**
- Build service trees (PVC → false ceiling → colors → pricing)
- Add material comparison matrix (PVC vs Gypsum specifics)
- Know typical questions per service
- Suggest complementary services

**Implementation:**
```typescript
interface ServiceProfile {
  name: 'pvc' | 'gypsum' | 'wpc' | 'uv_marble' | 'tv_unit' | 'wardrobe';
  priceRange: { min: number; max: number };
  commonQuestions: string[];
  typicalObjections: string[];
  installationDays: number;
  warranty: string;
  complementary: string[];  // What to suggest next
}

const SERVICE_PROFILES: Record<string, ServiceProfile> = {
  pvc: {
    commonQuestions: [
      "सफाई कैसे करते हैं?",
      "कितने दिन में लगेगा?",
      "क्या पानी सहन कर सकता है?"
    ],
    typicalObjections: [
      "क्या टिकाऊ है?",
      "फर्क गिप्सम से क्या है?"
    ]
  }
};
```

---

### 8. **Smart Follow-Up Suggestion**
**Current Issue:** Doesn't proactively guide conversation to next logical step

**Improvements:**
- After pricing question, automatically ask about timing
- After service selection, ask about room type
- After booking request, guide through information collection smoothly
- Suggest city-specific branches if multiple available

**Implementation:**
```typescript
function suggestNextQuestion(context: ConversationState): string {
  if (context.confirmedData.service && !context.confirmedData.roomSize) {
    return `Shukriya! Ab batao, room ka size kya hai? (e.g., 12x14 feet)`;
  }
  if (context.confirmedData.roomSize && !context.confirmedData.city) {
    return `Samajh gayi! Aap kis city mein ho?`;
  }
  // ... more rules
}
```

---

### 9. **Response Quality Scoring**
**Current Issue:** No feedback mechanism; can't learn from poor responses

**Improvements:**
- Rate responses on accuracy, relevance, tone
- Track which patterns lead to booking (positive reinforcement)
- Flag responses that confused users
- A/B test different answer variations

---

### 10. **Quick Escalation Path**
**Current Issue:** No clear path for complex queries → human agent

**Improvements:**
- Detect when user is asking for something outside scope
- Offer "Connect with Riya's team" option gracefully
- Summarize context for handoff to human agent
- Add human agent feedback loop to improve chatbot

---

## Implementation Priority

### Phase 1 (High Impact, Easy)
1. Expand Hinglish variants (quick win)
2. Improve lead scoring (helps sales team)
3. Better next-question suggestion (better UX)

### Phase 2 (Medium Impact)
1. Conversation state machine (prevents repetition)
2. Service-specific profiles (more relevant answers)
3. Response confidence scoring (better fallback handling)

### Phase 3 (High Impact, Complex)
1. Multi-turn memory optimization
2. Advanced intent sub-classification
3. Human escalation system

---

## Code Locations & Files to Modify

```
artifacts/api-server/src/
├── lib/
│   ├── chat-nlp.ts              ← Add detectIntentSubType()
│   ├── consultant-engine.ts     ← Add service profiles
│   ├── context-engine.ts        ← Add conversation state machine
│   └── lead-scorer.ts           ← NEW: Lead scoring system
├── routes/
│   └── chat.ts                  ← Add next-question logic, escalation
└── utils/
    └── hinglish-dict.ts         ← NEW: Expanded variant handling
```

---

## Success Metrics

- **Lower repetition rate:** < 5% of chats repeat same question
- **Higher booking rate:** Track % of qualified leads that convert
- **Reduced LLM calls:** Local engine handles > 80% of queries
- **Faster resolution:** Average messages-to-lead < 8
- **User satisfaction:** Implied by lead quality increase

---

## Next Steps

1. **Audit current chatbot logs** → Find top 20 common queries
2. **Build service profile database** → Service-specific Q&A
3. **Implement lead scorer** → Prioritize high-value conversations
4. **Add A/B testing framework** → Compare response variations
5. **Set up metrics dashboard** → Track improvements weekly

