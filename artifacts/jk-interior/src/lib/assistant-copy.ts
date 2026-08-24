import { PHONE_PRIMARY_DISPLAY, PHONE_SECONDARY_DISPLAY } from "./business-data"
import type { ReplyLanguage } from "./reply-language"

/**
 * The lines the chat widget says on its own — the welcome, the questions it asks
 * while booking a site visit, the offline notice.
 *
 * These exist in three languages for the same reason the model mirrors the
 * visitor's: a customer who has been chatting in Hinglish and then gets asked
 * "Could you share your WhatsApp number?" in English has just been handed off to
 * a different, colder assistant mid-sentence.
 *
 * This is interface copy, not business data. No rate, no service, no opening
 * hour is written here — the two phone numbers are imported from the same source
 * the header and the footer render, and everything priced comes from
 * SERVICES_SUMMARY through `buildRoomEstimate`.
 */

export interface AssistantCopy {
  welcome: string
  /** Header subtitle — availability, not opening hours (those come from the data). */
  statusOnline: string
  statusOffHours: string
  askName: string
  askNameAgain: string
  thanksAskPhone: (name: string) => string
  askPhone: string
  askPhoneAgain: string
  askCity: string
  askCityAgain: string
  askTime: (city?: string) => string
  bookingConfirmed: string
  teamWillContact: string
  cardTitle: string
  estimateIntro: (name?: string) => string
  estimateClosing: string
  chooseMaterial: string
  offlineIntro: string
  offlineOutro: string
  askSizeFor: (serviceName: string) => string
  resumeCollection: string
  placeholder: string
  listening: string
}

const EN: AssistantCopy = {
  welcome:
    "Welcome to JK Interior.\n\nI am the **JK Interior AI Assistant**. I answer from what this website publishes — our services, our rates, our warranty and where we work.\n\n📐 Share your room size (for example 12×10) and I will work out an estimate straight away. ✨",
  statusOnline: "Online now • replies in seconds",
  statusOffHours: "Away right now • WhatsApp is still answered",
  askName: "To book a free site visit, could you tell me your name first?",
  askNameAgain: "I could not quite read that as a name. Could you write just your name? (For example: Rahul, Priya)",
  thanksAskPhone: (name) => `Thank you, ${name}. Could you share your WhatsApp number? 📱`,
  askPhone: "I will need your WhatsApp number to book the free site visit. 📱",
  askPhoneAgain: "Could you write a valid 10-digit mobile number? 📱",
  askCity: "Thank you. Which town are you in? (Narpatganj, Forbesganj, Araria, Purnia and so on)",
  askCityAgain: "Could you tell me the name of your town?",
  askTime: (city) =>
    city
      ? `${city} — excellent. 📍 Which day and time would suit you for the site visit?`
      : "Number saved. 📱 Which day and time would suit you for the site visit?",
  bookingConfirmed: "Booking confirmed. Our team will be in touch with you shortly.",
  teamWillContact: "✅ Our team will be in touch with you shortly.",
  cardTitle: "Booking confirmed",
  estimateIntro: (name) => (name ? `${name}, here is your estimate.\n\n` : ""),
  estimateClosing: '\n\n📅 Say "Book Visit" or share your name and I will set up the free site visit.',
  chooseMaterial: "Which of the two suits your room?",
  offlineIntro: "I could not reach the assistant just now, so here is our published rate list:",
  offlineOutro: `For anything else — designs, timelines, an exact quotation — call ${PHONE_PRIMARY_DISPLAY} or ${PHONE_SECONDARY_DISPLAY}. The site visit and quotation are free.`,
  askSizeFor: (service) =>
    `Share the room size (for example 12×14) for an estimate of your ${service}, or call ${PHONE_PRIMARY_DISPLAY} for the free site visit.`,
  resumeCollection: "Coming back to the site visit —",
  placeholder: "Ask about designs, rates or a site visit…",
  listening: "Listening — go ahead",
}

const HINGLISH: AssistantCopy = {
  welcome:
    "JK Interior mein aapka swagat hai.\n\nMain **JK Interior AI Assistant** hoon. Jo is website par likha hai — hamari services, rates, warranty aur kaam ke ilaake — usi se jawab deta hoon.\n\n📐 Apne room ka size bhejiye (jaise 12×10), main turant estimate nikal deta hoon. ✨",
  statusOnline: "Abhi online • seconds mein jawab",
  statusOffHours: "Abhi door hain • WhatsApp par jawab milta rahega",
  askName: "Free site visit book karne ke liye pehle apna naam bata dijiye?",
  askNameAgain: "Ye naam samajh nahi aaya. Sirf apna naam likh dijiye. (Jaise: Rahul, Priya)",
  thanksAskPhone: (name) => `Dhanyavaad ${name}. Apna WhatsApp number bhej dijiye? 📱`,
  askPhone: "Free site visit book karne ke liye aapka WhatsApp number chahiye. 📱",
  askPhoneAgain: "Sahi 10 digit ka mobile number likh dijiye? 📱",
  askCity: "Dhanyavaad. Aap kis jagah se hain? (Narpatganj, Forbesganj, Araria, Purnia waghairah)",
  askCityAgain: "Apne town ka naam bata dijiye?",
  askTime: (city) =>
    city
      ? `${city} — bahut badhiya. 📍 Site visit ke liye kaun sa din aur time theek rahega?`
      : "Number save ho gaya. 📱 Site visit ke liye kaun sa din aur time theek rahega?",
  bookingConfirmed: "Booking confirm ho gayi. Hamari team jaldi aapse sampark karegi.",
  teamWillContact: "✅ Hamari team jaldi aapse sampark karegi.",
  cardTitle: "Booking confirm",
  estimateIntro: (name) => (name ? `${name} ji, ye raha aapka estimate.\n\n` : ""),
  estimateClosing: '\n\n📅 "Book Visit" likhiye ya apna naam bhejiye, main free site visit laga deta hoon.',
  chooseMaterial: "In dono mein se aapke room ke liye kaun sa theek rahega?",
  offlineIntro: "Abhi assistant se connect nahi ho paya, isliye hamari published rate list bhej raha hoon:",
  offlineOutro: `Baaki kuch bhi — design, time, exact quotation — ke liye ${PHONE_PRIMARY_DISPLAY} ya ${PHONE_SECONDARY_DISPLAY} par call kar lijiye. Site visit aur quotation dono free hain.`,
  askSizeFor: (service) =>
    `Apne ${service} ka estimate chahiye to room ka size bhejiye (jaise 12×14), ya free site visit ke liye ${PHONE_PRIMARY_DISPLAY} par call kar lijiye.`,
  resumeCollection: "Site visit ki baat par wapas —",
  placeholder: "Design, rate ya site visit — kuch bhi poochhiye…",
  listening: "Sun raha hoon — boliye",
}

const HINDI: AssistantCopy = {
  welcome:
    "JK Interior में आपका स्वागत है।\n\nमैं **JK Interior AI Assistant** हूँ। जो इस वेबसाइट पर प्रकाशित है — हमारी सेवाएँ, दरें, वारंटी और काम के इलाके — उसी से उत्तर देता हूँ।\n\n📐 अपने कमरे का साइज़ भेजिए (जैसे 12×10), मैं तुरंत अनुमान निकाल देता हूँ। ✨",
  statusOnline: "अभी ऑनलाइन • कुछ ही सेकंड में उत्तर",
  statusOffHours: "अभी दूर हैं • WhatsApp पर उत्तर मिलता रहेगा",
  askName: "फ्री साइट विज़िट बुक करने के लिए पहले अपना नाम बता दीजिए?",
  askNameAgain: "यह नाम समझ नहीं आया। सिर्फ़ अपना नाम लिख दीजिए। (जैसे: राहुल, प्रिया)",
  thanksAskPhone: (name) => `धन्यवाद ${name}। अपना WhatsApp नंबर भेज दीजिए? 📱`,
  askPhone: "फ्री साइट विज़िट बुक करने के लिए आपका WhatsApp नंबर चाहिए। 📱",
  askPhoneAgain: "सही 10 अंकों का मोबाइल नंबर लिख दीजिए? 📱",
  askCity: "धन्यवाद। आप किस जगह से हैं? (नरपतगंज, फारबिसगंज, अररिया, पूर्णिया इत्यादि)",
  askCityAgain: "अपने शहर या गाँव का नाम बता दीजिए?",
  askTime: (city) =>
    city
      ? `${city} — बहुत बढ़िया। 📍 साइट विज़िट के लिए कौन सा दिन और समय ठीक रहेगा?`
      : "नंबर सेव हो गया। 📱 साइट विज़िट के लिए कौन सा दिन और समय ठीक रहेगा?",
  bookingConfirmed: "बुकिंग कन्फ़र्म हो गई। हमारी टीम जल्दी ही आपसे संपर्क करेगी।",
  teamWillContact: "✅ हमारी टीम जल्दी ही आपसे संपर्क करेगी।",
  cardTitle: "बुकिंग कन्फ़र्म",
  estimateIntro: (name) => (name ? `${name} जी, यह रहा आपका अनुमान।\n\n` : ""),
  estimateClosing: '\n\n📅 "Book Visit" लिखिए या अपना नाम भेजिए, मैं फ्री साइट विज़िट लगा देता हूँ।',
  chooseMaterial: "इन दोनों में से आपके कमरे के लिए कौन सा ठीक रहेगा?",
  offlineIntro: "अभी असिस्टेंट से संपर्क नहीं हो पाया, इसलिए हमारी प्रकाशित रेट लिस्ट भेज रहा हूँ:",
  offlineOutro: `बाकी कुछ भी — डिज़ाइन, समय, सटीक कोटेशन — के लिए ${PHONE_PRIMARY_DISPLAY} या ${PHONE_SECONDARY_DISPLAY} पर कॉल कर लीजिए। साइट विज़िट और कोटेशन दोनों फ्री हैं।`,
  askSizeFor: (service) =>
    `अपने ${service} का अनुमान चाहिए तो कमरे का साइज़ भेजिए (जैसे 12×14), या फ्री साइट विज़िट के लिए ${PHONE_PRIMARY_DISPLAY} पर कॉल कर लीजिए।`,
  resumeCollection: "साइट विज़िट की बात पर वापस —",
  placeholder: "डिज़ाइन, रेट या साइट विज़िट — कुछ भी पूछिए…",
  listening: "सुन रहा हूँ — बोलिए",
}

const BY_LANGUAGE: Record<ReplyLanguage, AssistantCopy> = {
  english: EN,
  hinglish: HINGLISH,
  hindi: HINDI,
}

/** The widget's own scripted lines, in the language the visitor is being answered in. */
export function copyFor(language: ReplyLanguage | undefined): AssistantCopy {
  return BY_LANGUAGE[language ?? "english"] ?? EN
}
