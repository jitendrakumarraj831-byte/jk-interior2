/**
 * The JK Interior AI Assistant logo.
 *
 * A ceiling plane with a four-point light glowing beneath it — JK Interior's
 * own product (a false ceiling, cove-lit) doubling as the AI spark. Chosen over
 * a framed-room mark because it survives the sizes that matter: the glyph is
 * two shapes, so it still reads at the 14px avatar beside a chat message, where
 * anything more detailed turns to mush.
 *
 * Pure inline SVG with no dependencies, so it ships in the main bundle and
 * paints on the first frame — the launcher must never wait on a chunk. Colour
 * comes from `currentColor`, so it sits on the gold launcher, the dark header
 * avatar and the small message avatars without a second copy.
 */
export function AssistantMark({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      {/* the ceiling */}
      <path d="M4.4 3.4h15.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      {/* the light beneath it */}
      <path
        d="M12 6.6c.58 2.72 1.22 4.34 2.2 5.32.99.99 2.6 1.62 5.33 2.2-2.72.58-4.34 1.22-5.32 2.2-.99.99-1.62 2.6-2.2 5.33-.58-2.72-1.22-4.34-2.2-5.32-.99-.99-2.6-1.62-5.33-2.2 2.72-.58 4.34-1.22 5.32-2.2.99-.99 1.62-2.6 2.2-5.33Z"
        fill="currentColor"
      />
    </svg>
  )
}
