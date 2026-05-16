export type Message = {
    role: "user" | "assistant";
    content: string;
  };

  // The possible goals a user might have. This helps in guiding the conversation.
export type ConversationGoal =
| "get_estimate"
| "material_info"
| "design_advice"
| "general_query"
| "complaint"
| "greeting"
| "follow_up"
| "confirm"
| "deny"
| "unknown"

// All the topics the chatbot knows about.
export type ConversationTopic =
| "ceiling"
| "wall_panels"
| "tv_unit"
| "pricing"
| "materials"
| "process"
| "introduction"
| "none"