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

## Critical Rules

- **Never modify SEO metadata** — titles, descriptions, schema JSON-LD, alt text, keywords
- **Never change text content or headings**
- **Never remove or alter route structure** (app/ directories)
- Body tag must NOT have `bg-background` class (it overrides the gradient)
- All hardcoded `#0A0A0B` color references should use `#0b0f1a` instead
