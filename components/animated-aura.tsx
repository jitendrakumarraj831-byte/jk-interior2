/**
 * Server component: background motion via CSS only (no Framer on the main thread).
 */
export default function AnimatedAura() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Top radial highlight anchored to the gradient origin */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_130%_70%_at_50%_-10%,rgba(37,99,235,0.10),transparent_55%)]" />
      {/* Left blue aura */}
      <div className="aura-orb aura-orb-1 absolute -left-[20%] top-[5%] h-[min(90vw,720px)] w-[min(90vw,720px)] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.22)_0%,rgba(37,99,235,0.06)_45%,transparent_70%)] blur-[80px] md:blur-[100px] will-change-transform" />
      {/* Right sky-blue aura for depth */}
      <div className="aura-orb aura-orb-2 absolute -right-[15%] bottom-0 h-[min(85vw,640px)] w-[min(85vw,640px)] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18)_0%,rgba(219,234,254,0.08)_50%,transparent_72%)] blur-[80px] md:blur-[110px] will-change-transform" />
      {/* Center soft shimmer */}
      <div className="aura-orb aura-orb-3 absolute left-1/2 top-1/2 h-[50vh] w-[90vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(147,197,253,0.12)_0%,transparent_65%)] blur-[64px] md:blur-[80px] will-change-transform" />
      {/* Bottom vignette for gentle depth */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(219,234,254,0.12)_50%,rgba(191,219,254,0.20)_100%)]" />
    </div>
  )
}
