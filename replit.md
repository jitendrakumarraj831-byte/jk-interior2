# JK Interior

The marketing site and AI sales assistant for JK Interior, a false-ceiling and
interior-fit-out contractor serving Narpatganj, Forbesganj and Araria district,
Bihar. Live at jkinterior.online.

## Run & Operate

- `pnpm --filter @workspace/jk-interior run dev` — run the site locally (Vite dev server)
- `pnpm run typecheck` — typecheck across all packages
- `pnpm run build` — typecheck + production build
- Required env (for the AI chat backend, `api/chat.ts`): `GROQ_API_KEY` — without it, the chat widget gracefully falls back to its local scripted responses

## Stack

- pnpm workspace, Node.js 24, TypeScript 5.9
- Site: Vite + React 19 SPA (`wouter` for routing, not Next.js), Tailwind CSS, Framer Motion
- AI chat backend: a single Vercel serverless function (`api/chat.ts`) that calls Groq's OpenAI-compatible chat API
- Deploy: Vercel — `vercel.json` builds `artifacts/jk-interior` and serves `api/` as serverless functions

## Where things live

- `artifacts/jk-interior/` — the entire site (pages, components, business content, gallery data)
- `artifacts/jk-interior/src/components/jk-chat.tsx` — the AI assistant panel (lazy chunk, fetched on browser idle or on hover of the launcher)
- `artifacts/jk-interior/src/components/ui/assistant-launcher.tsx`, `assistant-mark.tsx` — the floating AI button and its logo. Eager and dependency-free on purpose, so they are in the prerendered HTML and paint before React hydrates — see "Assistant loading" below
- `artifacts/jk-interior/src/lib/business-data.ts` — builds the assistant's system prompt by *deriving* it from the modules the site itself renders (`services-summary.ts`, `faq-data.ts`, `business-facts.ts`, `seo.ts`). No business fact is hand-written here. Also owns room-dimension parsing (`extractDimensions`, `isSizeOnlyMessage`) and `buildRoomEstimate`, shared by the widget and `api/chat.ts` so the same code computes a room total everywhere it's quoted — the model is handed the finished figures, never asked to multiply them itself
- `artifacts/jk-interior/src/lib/business-facts.ts` — the "at a glance" facts, shared by the visible section and the assistant
- `artifacts/jk-interior/src/lib/memory.ts` — per-conversation memory, shared by the widget and `api/chat.ts` (imported directly by the serverless function via relative path). `sanitizeMemory()` re-validates whatever the browser posts before it lands in the system prompt
- `artifacts/jk-interior/src/lib/reply-language.ts` — detects whether a message is English, Hindi (Devanagari) or Hinglish (romanised Hindi), and keeps that choice sticky across a conversation
- `artifacts/jk-interior/src/lib/assistant-copy.ts` — the widget's own scripted lines (welcome message, booking questions, offline fallback) in all three languages
- `api/chat.ts` — the only backend code that's actually live in production
- `scripts/post-merge.sh` — Replit post-merge hook, runs `pnpm install` after a merge

## Architecture decisions

- The site is a Vite SPA, not Next.js, despite `next-themes` being a dependency (unused leftover from a shadcn template — harmless).
- No database or Express API server is deployed. Lead capture currently posts to `/api/leads`, which has no backend yet (client-side only: saved to `localStorage`, then the visitor is hand-off to WhatsApp) — see Gotchas.
- Images ship as AVIF+WebP pairs with lazy loading everywhere except the true above-the-fold hero/nav assets, which are eager + `fetchPriority="high"`.

## Product

A conversion-focused marketing site (services, gallery, service-area pages, FAQ) plus an AI chat widget that answers pricing/material questions, estimates room costs from dimensions the visitor types, and hands qualified leads off to WhatsApp/a phone call.

## The assistant answers only from website data

The chat assistant is grounded on purpose: `buildSystemPrompt()` generates the
whole system prompt from the same data the pages render, and the prompt forbids
stating anything that isn't in it. There is no second, hand-written copy of the
services, rates or hours anywhere in the assistant path — that duplication is
what previously had it quoting a modular-kitchen price, a laminate-flooring
rate and opening hours the site never published.

To change what the assistant knows, edit the website data (`services-summary.ts`,
`faq-data.ts`, `business-facts.ts`, `seo.ts`). Never add facts to
`business-data.ts` or `jk-chat.tsx` directly.

## The assistant mirrors the visitor's language, and never does its own math

Most visitors write in Hindi or Hinglish (romanised Hindi), not English.
`reply-language.ts` detects which one a message is in and `api/chat.ts` keeps
that choice sticky in `ConversationMemory.language` for the rest of the
conversation, so a visitor who has been typing Hinglish and then sends just
"12x14" doesn't get answered in English. `assistant-copy.ts` carries the
widget's own scripted lines (welcome, booking questions, offline fallback) in
all three languages so the AI's replies and the widget's own UI copy never
disagree on language mid-conversation.

Room estimates are computed once, in `buildRoomEstimate()` (business-data.ts),
and handed to the model already finished via `LeadContext.groundedEstimate` —
the model is told to quote that figure, never to multiply area × rate itself.
Models are unreliable arithmetic, and a wrong total on what reads like a
quotation is worse than no total.

## Assistant loading

The launcher button and the chat panel are deliberately separate:

- `AssistantLauncher` is an ordinary eager component, so it lands in the
  prerendered HTML of all 64 pages and is styled by `index.css` alone. It paints
  with the document — verified visible with JavaScript disabled entirely.
- `jk-chat.tsx` is a lazy chunk, fetched on `requestIdleCallback` or on hover of
  the button, then mounted closed so the first tap is a state flip.
- An inline script in `index.html` records a tap that lands before hydration and
  `App` replays it. Without that, the early tap would hit a button with no
  handler and silently do nothing.

Measured on a throttled connection (1.6 Mbps, 150 ms RTT, 4× CPU): button
visible at **0.5 s** rather than 2.8 s, and open latency unchanged at ~170 ms.
The previous version rendered the button through Framer Motion, which baked
`opacity: 0` into the static HTML — it was in the markup but invisible until the
JS bundle had downloaded, hydrated and animated it in.

Anything added to the launcher path must stay dependency-free. Importing Framer
Motion, the chat code or business data into it pulls that weight into the main
bundle and undoes this.

## Gotchas

- `fetch("/api/leads", …)` in `jk-chat.tsx` has no live backend — it 404s silently (wrapped in `.catch(() => {})`). Leads are actually captured via `localStorage` + a WhatsApp deep link. Don't assume leads are landing in a database anywhere.
- `api/chat.ts` imports directly from `artifacts/jk-interior/src/lib/*` by relative path — moving or renaming those files breaks the live AI backend, not just the frontend.
- Without `GROQ_API_KEY` set in the Vercel project, `/api/chat` returns `{ ok: false }` and the widget falls back to a minimal offline reply (the published rate list plus the phone numbers — it answers nothing on its own). This fails safe, not loudly, so a missing key is easy to miss.
- `GROQ_MODEL` overrides the model (default `openai/gpt-oss-120b`). The system prompt is a long block of website data plus language-mirroring rules; smaller/distilled models were faster but dropped those rules under load — quoting invented rates and answering Hindi messages in English. Only drop to a smaller model if latency becomes the binding constraint and drift is re-verified as gone.
- Groq deprecated `llama-3.3-70b-versatile` and `llama-3.1-8b-instant` for free/developer-tier usage in June 2026 (enterprise committed-spend contracts were unaffected), which silently took `/api/chat` down in production — every call 404'd with `model_not_found` until the default was updated. If the assistant starts always giving the offline fallback reply again, check the Vercel function logs for a Groq 404 before anything else; Groq has deprecated models here before and will again — see https://console.groq.com/docs/deprecations.
- `api/chat.ts` rate-limits by IP in a module-scope `Map` — fine for a single warm lambda instance, but it resets on cold start and doesn't coordinate across concurrent instances. It's a cost ceiling, not a real abuse defense; don't rely on it if traffic grows enough to need one.
- The chat widget's "clear conversation" (↺) button removes `localStorage["jk_memory_v1"]` via `clearMemory()` — that constant lives in `lib/memory.ts` (`MEMORY_KEY`) precisely so this can't drift out of sync again; it previously removed a key nothing ever wrote to, so a "cleared" chat reappeared on the next page load.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
