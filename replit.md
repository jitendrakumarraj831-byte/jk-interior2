# JK Interior

A Next.js 15 website for JK Interior, a PVC wall paneling and false ceiling contractor based in Forbesganj, Bihar, India.

## Architecture

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 with custom luxury utility classes
- **Components**: shadcn/ui base components + fully custom premium UI components
- **Fonts**: Playfair Display + Inter (Google Fonts via next/font)
- **Animations**: Framer Motion (scroll-triggered, staggered, parallax)
- **Analytics**: @vercel/analytics
- **Node runtime**: Node.js 20

## Design System

### Background
Global body background: `radial-gradient(circle at top, #dbeafe, #f0f7ff)` — light blue (Tailwind blue-100 to near-white) with `background-attachment: fixed` — applied in `app/globals.css` @layer base. Do NOT add `bg-background` utility class to `<body>` in layout.tsx as it overrides the gradient.

### Glassmorphism (Light Theme)
- `glass-panel`: `rgba(255,255,255,0.78)` bg, `blur(6px)`, `rgba(37,99,235,0.12)` border, subtle blue shadow
- `glass-card`: `rgba(255,255,255,0.80)` bg, `blur(6px)`, `rgba(37,99,235,0.10)` border, `border-radius: 1.25rem`
- `glass-input`: `rgba(255,255,255,0.88)` bg, `blur(4px)`, blue border accent

### Blue Palette (replaces Gold)
- `--gold` (primary blue): `#2563eb`
- `--gold-light`: `#60a5fa`
- `--gold-dark`: `#1d4ed8`
- `--gold-hover`: `#3b82f6`
- `.gold-gradient`: deep-to-bright blue gradient for CTA buttons
- `.gold-text`: blue gradient text clip
- `.btn-luxury-glow`: blue box-shadow glow effect
- `.luxury-animated-shine`: animated shine sweep on buttons

### Image Overlays
Use `from-[#f0f7ff]` to match the page light blue base color. Lightbox stays dark (`#0f172a`).

## Project Structure

- `app/` — Next.js App Router pages (home, about, gallery, services, contact)
  - `app/layout.tsx` — Global layout, SEO metadata, fonts. Do NOT touch SEO fields.
  - `app/globals.css` — All CSS variables, glass utilities, animations
  - `app/page.tsx` — Home page with dynamic imports for code splitting
- `components/` — Shared UI components
  - `components/navbar.tsx` — Floating pill navbar with glassmorphism
  - `components/hero.tsx` — Full-height hero with auto-sliding image carousel
  - `components/services.tsx` — Bento grid services layout
  - `components/experience-section.tsx` — Parallax wrapper for WhyUs + Gallery
  - `components/why-us.tsx` — Reasons grid/horizontal scroll (with JSON-LD)
  - `components/gallery.tsx` — Masonry grid + lightbox (with JSON-LD)
  - `components/service-areas.tsx` — Hub map layout with JSON-LD
  - `components/contact.tsx` — Contact form + map iframe + info cards
  - `components/footer.tsx` — Footer with links and contact info
  - `components/animated-aura.tsx` — Fixed background aura orbs (CSS-only, no JS)
  - `components/motion-reveal.tsx` — Reusable Framer Motion variants
  - `components/Layout/BentoGrid.tsx` — Bento grid layout component
- `components/ui/` — shadcn/ui base components
- `hooks/` — Custom React hooks
- `lib/utils.ts` — Utility functions (cn)
- `public/images/` — All project images (JPEG)

## Image Quality Config
All `next/image` quality values must be declared in `next.config.mjs` `images.qualities`:
`[50, 52, 58, 62, 68, 72, 78, 80, 82, 100]`

## Running

```bash
npm run dev    # Development server on port 5000
npm run build  # Production build
npm run start  # Production server on port 5000
```

## Replit Configuration

- Runs on port 5000 (required for Replit preview pane)
- Binds to 0.0.0.0 for external access through Replit proxy
- Workflow: "Start application" runs `npm run dev`
- Node.js 20 required for @tailwindcss/oxide native bindings

## SEO Configuration

- **Domain**: `https://www.jkinterior.online` (www only — canonical set on every page)
- **Layout JSON-LD `@graph`**: Enriched LocalBusiness/HomeAndConstructionBusiness/GeneralContractor with geo coordinates (26.3001, 87.2533), postal code, both phone numbers, full areaServed City list (Forbesganj, Araria, Jogbani, Raniganj, Narpatganj, Kursakanta, Tribeniganj, Chhatapur, Supaul, Purnia), GeoCircle serviceArea, openingHoursSpecification, hasOfferCatalog, sameAs, priceRange. Plus `WebSite` + `FAQPage` schemas.
- **Per-page metadata**: Unique `title`, `description`, `keywords`, `alternates.canonical`, `openGraph`, `twitter` on every page
- **Geo meta tags**: `geo.region`, `geo.position`, `ICBM`, `business:contact_data:*` set in `app/layout.tsx` `metadata.other`
- **Per-page BreadcrumbList JSON-LD**: Home/About/Services/Gallery/Contact each emit a BreadcrumbList script. Services page also emits a Service `ItemList` with target keywords.
- **Sitemap priorities**: `/` → 1.0, `/services` → 0.9, `/gallery` → 0.8, `/about` → 0.7, `/contact` → 0.7. Stable `lastModified` date (no per-build churn).
- **Robots**: `app/robots.ts` allows all, sitemap URL is `https://www.jkinterior.online/sitemap.xml`
- **H1**: Every page has exactly one keyword-rich `<h1 className="sr-only">`. Hero uses a styled `<div role="heading" aria-level={2}>` for the brand wordmark to avoid duplicate H1 (no visual change).

## Critical Rules

- **Never change text content or headings**
- **Never remove or alter route structure** (app/ directories)
- Body tag must NOT have `bg-background` class (it overrides the gradient)
- All hardcoded `#0A0A0B` color references should use `#0b0f1a` instead
- When updating SEO: keep all canonical URLs as `https://www.jkinterior.online/[page]` (www, no trailing slash for sub-pages)
- **Real WhatsApp number is `918651070831`** (also `918541849118` as secondary). Never use placeholders like `919999999999`.

## Audit Fixes (Apr 2026)

- `components/jk-chat.tsx`: WhatsApp number fixed from placeholder `919999999999` → real `918651070831`.
- `components/contact.tsx`: Form was a fake `setTimeout` → alert. Now `handleSubmit` builds a WhatsApp deep link (`wa.me/918651070831`) with the user's name, phone, service and message, opens it in a new tab and resets the form. Inputs now have `name`, `autoComplete` and proper validation (`pattern` on phone). Submit button label changed to "WhatsApp पर भेजें / Send via WhatsApp".
- `next.config.mjs`: Added `optimizePackageImports: ['lucide-react', 'framer-motion']` for tree-shaking, plus `poweredByHeader: false`, `productionBrowserSourceMaps: false`, `reactStrictMode: true`.
- `app/globals.css` (earlier): Removed `transform: translateZ(0)` and `will-change: transform` from `.mesh-aurora` so it no longer creates a containing block that broke the gallery lightbox `position: fixed`.
- `components/gallery.tsx` (earlier): WPC masonry rewritten to CSS multi-column (`columns-2 md:columns-3` + `break-inside-avoid`) instead of the broken 3-col-in-2-grid layout.
