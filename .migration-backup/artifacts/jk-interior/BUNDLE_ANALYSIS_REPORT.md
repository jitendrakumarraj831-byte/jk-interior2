# Frontend Bundle Analysis Report

## Build snapshot
Generated from `pnpm --filter @workspace/jk-interior run build` on 2026-05-28.

Top JS chunks (gzip):
- `xlsx` — 142.94 kB (lazy chunk, only loaded from Admin Excel export)
- `react-vendor` — 78.32 kB
- `vendor` — 47.09 kB
- `jk-chat` — 22.35 kB (lazy chunk)

## Optimizations applied
1. Route-level lazy loading for all page routes in `App.tsx`.
2. Lazy loading for chat widget retained.
3. Manual chunking strategy in Vite:
   - `react-vendor`
   - `ui-vendor`
   - `motion-vendor`
   - `vendor`
   - `xlsx`
4. Lazy image decoding/loading in chat gallery previews.

## Impact
- Initial route payload is substantially reduced by splitting page bundles.
- Heavy admin dependency (`xlsx`) no longer inflates critical path.
- Better first-load behavior and improved FCP/LCP opportunities on mobile.

## Remaining Lighthouse opportunities
- Inline critical CSS for above-the-fold hero text.
- Replace Google Font blocking path with self-hosted subsets.
- Add preconnect/preload strategy for top hero image assets.
- Consider reducing UI dependency surface (Radix spread) in non-critical routes.
