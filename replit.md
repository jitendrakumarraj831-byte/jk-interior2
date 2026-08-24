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
- `artifacts/jk-interior/src/components/jk-chat.tsx` — the AI assistant widget (lazy-loaded, deferred until the page is idle/interactive)
- `artifacts/jk-interior/src/lib/business-data.ts`, `memory.ts` — shared by both the client-side chat fallback and `api/chat.ts` (imported directly by the serverless function via relative path)
- `api/chat.ts` — the only backend code that's actually live in production
- `scripts/post-merge.sh` — Replit post-merge hook, runs `pnpm install` after a merge

## Architecture decisions

- The site is a Vite SPA, not Next.js, despite `next-themes` being a dependency (unused leftover from a shadcn template — harmless).
- No database or Express API server is deployed. Lead capture currently posts to `/api/leads`, which has no backend yet (client-side only: saved to `localStorage`, then the visitor is hand-off to WhatsApp) — see Gotchas.
- Images ship as AVIF+WebP pairs with lazy loading everywhere except the true above-the-fold hero/nav assets, which are eager + `fetchPriority="high"`.

## Product

A conversion-focused marketing site (services, gallery, service-area pages, FAQ) plus an AI chat widget that answers pricing/material questions, estimates room costs from dimensions the visitor types, and hands qualified leads off to WhatsApp/a phone call.

## Gotchas

- `fetch("/api/leads", …)` in `jk-chat.tsx` has no live backend — it 404s silently (wrapped in `.catch(() => {})`). Leads are actually captured via `localStorage` + a WhatsApp deep link. Don't assume leads are landing in a database anywhere.
- `api/chat.ts` imports directly from `artifacts/jk-interior/src/lib/*` by relative path — moving or renaming those files breaks the live AI backend, not just the frontend.
- Without `GROQ_API_KEY` set in the Vercel project, `/api/chat` returns `{ ok: false }` and the widget silently uses its local scripted fallback — this fails safe, not loudly, so a missing key is easy to miss.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
