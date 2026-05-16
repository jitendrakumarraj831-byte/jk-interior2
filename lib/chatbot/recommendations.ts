import { ConversationState } from "./context";

// --- 1. ENHANCED DATA STRUCTURE ---

interface MaterialProperties {
    name: string;
    description: string; 
    talkingPoint: string; // Hinglish point for the AI to use
    priceRange: "low" | "mid" | "high";
    maintenance: "low" | "medium" | "high";
    look: "basic" | "standard" | "premium";
    moistureResistance: "low" | "medium" | "high";
    bestFor?: string[]; // e.g., ["kids room", "office"]
    safetyNotes?: string;
}

// --- 2. EXPANDED STRUCTURED KNOWLEDGE BASE ---

const MATERIAL_DATA: { [key: string]: MaterialProperties } = {
    "gypsum": {
        name: "Gypsum Ceiling",
        description: "Standard POP/Gypsum false ceiling. Most common and budget-friendly.",
        talkingPoint: "Gypsum (ya POP) sabse common aur budget-friendly option hai. Isse ek clean aur smooth finish milti hai.",
        priceRange: "low",
        maintenance: "medium",
        look: "standard",
        moistureResistance: "low",
        bestFor: ["Living Room", "Bedroom", "Dining Room"],
        safetyNotes: "Standard fire resistance, but not waterproof."
    },
    "pvc": {
        name: "PVC Panels",
        description: "PVC panels are a cost-effective, waterproof, and low-maintenance solution.",
        talkingPoint: "PVC panels waterproof hote hain aur inka maintenance bhi kaafi kam hai. Yeh ek budget-friendly option bhi hai.",
        priceRange: "low",
        maintenance: "low",
        look: "basic",
        moistureResistance: "high",
        bestFor: ["Bathroom", "Kitchen", "Balcony", "Areas with moisture"],
        safetyNotes: "Good for moisture-prone areas."
    },
    "wpc": {
        name: "WPC Louvers/Panels",
        description: "Wood Plastic Composite is 100% waterproof, termite-proof, and gives a premium wooden look.",
        talkingPoint: "WPC panels premium hote hain aur 100% waterproof aur termite-proof hote hain. Inse wooden jaisa look aata hai.",
        priceRange: "high",
        maintenance: "low",
        look: "premium",
        moistureResistance: "high",
        bestFor: ["Feature Wall", "Exterior", "Bathroom", "TV Unit"],
        safetyNotes: "Very durable and long-lasting."
    },
    "fabric": {
        name: "Fabric Panels",
        description: "Fabric panels offer a soft, luxurious feel and excellent sound absorption.",
        talkingPoint: "Bedroom ya home theater ke liye, fabric panels ek soft aur cozy look dete hain aur sound ko bhi absorb karte hain.",
        priceRange: "high",
        maintenance: "high",
        look: "premium",
        moistureResistance: "low",
        bestFor: ["Bedroom", "Home Theater", "Quiet rooms"],
        safetyNotes: "Best for low-traffic, clean environments."
    },
     "charcoal": {
        name: "Charcoal Panels",
        description: "Charcoal panels give a very modern and sleek look, often used for TV units and feature walls.",
        talkingPoint: "Agar aapko ekdum modern aur sleek look chahiye, to charcoal panels best hain. TV units aur feature walls ke liye perfect hai.",
        priceRange: "mid",
        maintenance: "low",
        look: "premium",
        moistureResistance: "medium",
        bestFor: ["TV Unit", "Feature Wall", "Living Room"],
        safetyNotes: "Durable and easy to clean."
    }
};

// --- 3. ADVANCED RECOMMENDATION LOGIC ---

interface AdviceResponse {
    hasAdvice: boolean;
    adviceText?: string;
}

/**
 * A more powerful reasoning engine to generate advice from the knowledge base.
 */
export function getAdvice(state: ConversationState, query: string): AdviceResponse {
    const lowerQuery = query.toLowerCase();
    let advice = "";

    // Reasoning 1: Moisture Concern ("nami", "seelan", "waterproof")
    if (lowerQuery.includes("nami") || lowerQuery.includes("seelan") || lowerQuery.includes("waterproof")) {
        const suitable = Object.values(MATERIAL_DATA).filter(m => m.moistureResistance === 'high');
        advice = `Nami ya seelan wali jagah ke liye, aapko waterproof material use karna chahiye. Best options hain ${suitable.map(m => m.name).join(' ya ')}. ${suitable[0].talkingPoint}`;
        return { hasAdvice: true, adviceText: advice };
    }

    // Reasoning 2: Budget vs. Look ("sasta lekin premium", "low budget premium look")
    if (lowerQuery.includes("budget") && lowerQuery.includes("premium")) {
        const suitable = Object.values(MATERIAL_DATA).filter(m => m.priceRange === 'mid' && m.look === 'premium');
        advice = `Kam budget mein premium look ke liye, ${suitable.map(m => m.name).join(' aur ')} ek bahut accha option hai. ${suitable[0].talkingPoint}`;
        return { hasAdvice: true, adviceText: advice };
    }

    // Reasoning 3: Maintenance Comparison ("maintenance kis me kam hai")
    if (lowerQuery.includes("maintenance") && lowerQuery.includes("kam")) {
        const lowMaintenance = Object.values(MATERIAL_DATA).filter(m => m.maintenance === 'low').map(m => m.name).join(', ');
        advice = `Sabse kam maintenance ${lowMaintenance} mein hota hai. Inhe saaf karna bahut aasan hai.`;
        return { hasAdvice: true, adviceText: advice };
    }

    // Reasoning 4: Child Safety ("bachcho ke room", "kids room")
    if (lowerQuery.includes("bachcho") || lowerQuery.includes("kids")) {
         const suitable = Object.values(MATERIAL_DATA).find(m => m.name === "WPC Louvers/Panels"); // WPC is durable
         advice = `Bachchon ke room ke liye, safety aur durability important hai. Main aapko ${suitable?.name} suggest karunga. ${suitable?.safetyNotes} Inhe saaf karna bhi easy hai.`;
         return { hasAdvice: true, adviceText: advice };
    }

    // No specific advice pattern found, let the AI handle it.
    return { hasAdvice: false };
}
