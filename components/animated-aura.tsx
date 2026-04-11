/**
 * Server component: background motion via CSS only (no Framer on the main thread).
 */
export default function AnimatedAura() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(201,162,74,0.1),transparent_50%)]" />
      <div className="aura-orb aura-orb-1 absolute -left-[20%] top-[5%] h-[min(90vw,720px)] w-[min(90vw,720px)] rounded-full bg-[radial-gradient(circle,rgba(212,175,106,0.2)_0%,rgba(139,111,48,0.06)_45%,transparent_70%)] blur-[80px] md:blur-[100px] will-change-transform" />
      <div className="aura-orb aura-orb-2 absolute -right-[15%] bottom-0 h-[min(85vw,640px)] w-[min(85vw,640px)] rounded-full bg-[radial-gradient(circle,rgba(184,148,72,0.16)_0%,rgba(90,72,36,0.08)_50%,transparent_72%)] blur-[80px] md:blur-[110px] will-change-transform" />
      <div className="aura-orb aura-orb-3 absolute left-1/2 top-1/2 h-[50vh] w-[90vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(230,201,128,0.07)_0%,transparent_65%)] blur-[64px] md:blur-[80px] will-change-transform" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(8,8,12,0.4)_50%,rgba(6,6,10,0.85)_100%)]" />
    </div>
  )
}
