# JK Interior

A Next.js 15 website for JK Interior, a PVC wall paneling and false ceiling contractor based in Forbesganj, Bihar, India.

## Architecture

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Fonts**: Playfair Display + Inter (Google Fonts via next/font)
- **Analytics**: @vercel/analytics
- **Node runtime**: Node.js 20

## Project Structure

- `app/` — Next.js App Router pages (home, about, gallery, services, contact)
- `components/` — Shared UI components (shadcn/ui + custom)
- `hooks/` — Custom React hooks
- `lib/` — Utility functions
- `public/` — Static assets (images, favicon)
- `styles/` — Global CSS (handled in app/globals.css)

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
