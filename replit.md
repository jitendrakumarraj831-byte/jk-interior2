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
- `artifacts/jk-interior/src/lib/business-data.ts` — builds the assistant's system prompt by *deriving* it from the modules the site itself renders (`services-summary.ts`, `faq-data.ts`, `business-facts.ts`, `seo.ts`). No business fact is hand-written here
- `artifacts/jk-interior/src/lib/business-facts.ts` — the "at a glance" facts, shared by the visible section and the assistant
- `artifacts/jk-interior/src/lib/memory.ts` — per-conversation memory, shared by the widget and `api/chat.ts` (imported directly by the serverless function via relative path)
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
- `GROQ_MODEL` overrides the model (default `llama-3.1-8b-instant`). The system prompt is now a long block of website data; if the assistant starts drifting from it, a larger model such as `llama-3.3-70b-versatile` follows the grounding rules more reliably at some latency cost.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
