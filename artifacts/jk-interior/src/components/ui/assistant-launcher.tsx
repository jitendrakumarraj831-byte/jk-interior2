import { AssistantMark } from "./assistant-mark"

/**
 * The floating button that opens the AI assistant.
 *
 * Deliberately dependency-free — no Framer Motion, no chat code — so it lives
 * in the main bundle and paints with the first frame. The chat panel itself is
 * a lazy chunk; this button is what the visitor sees while that chunk is still
 * on the wire, and `onPrefetch` fires on hover/touch so the chunk is usually
 * already warm by the time the click lands.
 *
 * Rendered both by App (before the panel has ever been opened) and by the chat
 * widget itself (once it owns the state), so the two are pixel-identical and
 * the handover is invisible.
 */
export function AssistantLauncher({
  onOpen,
  onPrefetch,
  busy = false,
}: {
  onOpen: () => void
  onPrefetch?: () => void
  busy?: boolean
}) {
  return (
    <button
      type="button"
      data-jk-launcher=""
      onClick={onOpen}
      onPointerEnter={onPrefetch}
      onFocus={onPrefetch}
      onTouchStart={onPrefetch}
      className="jk-launcher fixed bottom-24 right-4 z-50 md:bottom-24 md:right-6"
      style={{ width: 62, height: 62 }}
      aria-label="Open chat with JK Interior AI Assistant"
    >
      {/* Ambient glow */}
      <span
        className="jk-launcher-glow absolute -inset-2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.28) 0%, transparent 70%)" }}
      />

      {/* Gold tile */}
      <span
        className="absolute inset-0 rounded-[20px] shadow-[0_8px_28px_rgba(212,175,55,0.45)]"
        style={{ background: "linear-gradient(140deg, #dec163 0%, #c9a227 45%, #896918 100%)" }}
      />

      {/* Inner shimmer */}
      <span
        className="absolute inset-0 rounded-[20px] opacity-40"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 55%)" }}
      />

      <span className="absolute inset-0 flex items-center justify-center text-white">
        <AssistantMark className="h-[30px] w-[30px]" />
      </span>

      <span className="absolute -top-1.5 -right-1 rounded-full bg-white px-1.5 py-0.5 text-[8px] font-black text-gold-700 shadow-lg leading-none">
        {busy ? "···" : "AI"}
      </span>
    </button>
  )
}
