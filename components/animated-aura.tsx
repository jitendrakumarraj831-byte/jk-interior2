/**
 * Server component: fixed background gradient + motion via CSS only.
 * Gradient lives here (position: fixed) so body can use a simple solid color,
 * avoiding the scroll-jank of background-attachment: fixed.
 */
export default function AnimatedAura() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Full-page gradient — fixed here so body stays solid (no repaint on scroll) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#dbeafe,#f0f7ff)]" />
      {/* Top radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_130%_70%_at_50%_-10%,rgba(37,99,235,0.10),transparent_55%)]" />
      {/* Left blue aura */}
      <div className="aura-orb aura-orb-1 absolute -left-[20%] top-[5%] h-[min(90vw,720px)] w-[min(90vw,720px)] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.20)_0%,rgba(37,99,235,0.05)_45%,transparent_70%)] blur-[40px] md:blur-[50px] will-change-transform" />
      {/* Right sky-blue aura */}
      <div className="aura-orb aura-orb-2 absolute -right-[15%] bottom-0 h-[min(85vw,640px)] w-[min(85vw,640px)] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.16)_0%,rgba(219,234,254,0.06)_50%,transparent_72%)] blur-[40px] md:blur-[50px] will-change-transform" />
      {/* Center soft shimmer */}
      <div className="aura-orb aura-orb-3 absolute left-1/2 top-1/2 h-[50vh] w-[90vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(147,197,253,0.10)_0%,transparent_65%)] blur-[30px] md:blur-[40px] will-change-transform" />
    </div>
  )
}
