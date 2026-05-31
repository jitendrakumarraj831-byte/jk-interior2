# JK Interior

Interior design business website for Bihar, India — featuring AI chatbot, leads database, and admin panel.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/jk-interior run dev` — run the frontend (port auto-assigned)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (auto-set by Replit)
- Optional env: `GROQ_API_KEY` — enables Groq LLM responses in chatbot (falls back to local engine if absent)
- Optional env: `ADMIN_KEY` — admin panel password (default: `jkadmin2024`)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, wouter routing, Tailwind v4, framer-motion
- API: Express 5 (port 8080)
- DB: PostgreSQL + Drizzle ORM (`leads` table)
- Validation: Zod (`zod/v4`)
- Fonts: Inter + Playfair Display (Google Fonts)
- Build: esbuild (ESM bundle)

## Where things live

- `artifacts/jk-interior/src/pages/` — page components (Home, Services, Gallery, About, FAQ, Contact, Admin, City)
- `artifacts/jk-interior/src/components/` — shared components incl. `jk-chat.tsx` (AI chatbot widget)
- `artifacts/jk-interior/src/lib/` — business data, gallery data, memory helpers
- `artifacts/api-server/src/routes/` — `chat.ts`, `contact.ts`, `leads.ts`
- `artifacts/api-server/src/lib/` — `business-data.ts`, `consultant-engine.ts`, `context-engine.ts`
- `lib/db/src/schema/index.ts` — Drizzle schema (source of truth for DB)

## Architecture decisions

- Chatbot has two layers: a fast local rule/keyword engine (`consultant-engine.ts`) + optional Groq LLM fallback
- All leads captured by chatbot are saved to PostgreSQL via `/api/leads`
- Admin panel at `/admin` requires password (stored in session storage); exports leads to CSV or Excel
- Vite dev server proxies `/api/*` to the Express server at port 8080
- No Next.js / no `"use client"` — pure React SPA with wouter client-side routing

## Product

- Multi-page interior design website for JK Interior (Forbesganj, Bihar)
- Services: PVC false ceiling, gypsum ceiling, WPC wall panels, UV marble sheets, modular TV units
- AI consultant chatbot "Riya" — answers pricing questions, qualifies leads, saves contact info
- Admin panel: view/filter/mark-read leads, WhatsApp/call shortcut, export CSV/Excel
- City landing pages for local SEO (Forbesganj, Araria, Purnia, etc.)

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- API server must be running for chatbot and contact form to work
- `GROQ_API_KEY` is optional — chatbot works without it using the local consultant engine
- Admin default password: `jkadmin2024` (override with `ADMIN_KEY` env var)
- After schema changes: run `pnpm --filter @workspace/db run push`

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
