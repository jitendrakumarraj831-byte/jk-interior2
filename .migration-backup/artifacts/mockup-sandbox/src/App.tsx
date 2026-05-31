import { useMemo, useState } from "react";

type ChatMsg = { role: "user" | "assistant"; content: string };

const QUICK_ACTIONS = ["PVC ceiling ka rate", "Patna me service?", "Site visit book karna hai"];

const BOT_GREETING = "Namaste 👋 Main JK Interior AI assistant hoon. Pricing, design, location, booking — jo poochna hai poochhiye.";

function simulateReply(text: string): string {
  const t = text.toLowerCase();
  if (/(patna|araria|forbesganj|location|city|service)/.test(t)) return "Haan, Patna/Araria/Forbesganj side mein service available hai. Exact area bata do, team availability confirm kar deti hoon.";
  if (/(book|visit|booking|site visit)/.test(t)) return "Great 🙌 Free site visit ke liye bas naam + city + phone share kar dijiye. Preferred time bhi de sakte hain.";
  if (/(price|rate|kitna|cost|pvc|gypsum|wpc|uv)/.test(t)) return "Quick range: PVC ₹80–140/sqft, Gypsum ₹80–140/sqft, WPC ₹180–450/sqft, UV ₹50–95/sqft. Exact estimate ke liye room size (12x14) bhej dijiye.";
  return "Samajh gayi 👍 Aapka focus pricing, design idea, ya booking mein se kis par hai?";
}

export default function App() {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([{ role: "assistant", content: BOT_GREETING }]);

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  const send = (text: string) => {
    const cleaned = text.trim();
    if (!cleaned) return;
    setMessages((m) => [...m, { role: "user", content: cleaned }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", content: simulateReply(cleaned) }]);
      setTyping(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#162239,_#090d17_60%)] text-white">
      <div className="fixed bottom-5 right-5 z-30">
        {!open && (
          <button className="rounded-full bg-white/15 backdrop-blur-xl border border-white/25 px-5 py-3 shadow-2xl" onClick={() => setOpen(true)}>
            ✨ Ask AI Assistant
          </button>
        )}

        {open && (
          <div className="w-[min(94vw,380px)] h-[74vh] rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className="px-4 py-3 border-b border-white/15 flex items-center justify-between bg-white/8">
              <div>
                <p className="font-semibold">JK Interior AI</p>
                <p className="text-xs text-white/70">Online • Premium Assistant</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div className={m.role === "user" ? "max-w-[85%] rounded-2xl rounded-br-md px-3 py-2 bg-indigo-500 text-white" : "max-w-[88%] rounded-2xl rounded-bl-md px-3 py-2 bg-white/18 text-white border border-white/15"}>{m.content}</div>
                </div>
              ))}
              {typing && <div className="text-sm text-white/70 animate-pulse">Assistant is typing...</div>}
            </div>

            <div className="px-3 pb-2 flex gap-2 overflow-x-auto">
              {QUICK_ACTIONS.map((q) => <button key={q} onClick={() => send(q)} className="text-xs whitespace-nowrap rounded-full border border-white/25 px-3 py-1.5 bg-white/10 hover:bg-white/20">{q}</button>)}
            </div>

            <form
              className="p-3 border-t border-white/15 bg-black/10"
              onSubmit={(e) => { e.preventDefault(); send(input); }}
            >
              <div className="flex gap-2">
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." className="flex-1 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm outline-none placeholder:text-white/55" />
                <button disabled={!canSend} className="rounded-xl bg-white text-slate-900 px-3 py-2 text-sm font-semibold disabled:opacity-40">Send</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
