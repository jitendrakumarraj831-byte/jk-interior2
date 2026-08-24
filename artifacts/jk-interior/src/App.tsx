import React, { lazy, Suspense } from "react"
import { Switch, Route, Router as WouterRouter } from "wouter"
import { MotionConfig } from "framer-motion"
import ScrollProgress from "@/components/scroll-progress"
import { AssistantLauncher } from "@/components/ui/assistant-launcher"

const HomePage = lazy(() => import("@/pages/HomePage"))
const AboutPage = lazy(() => import("@/pages/AboutPage"))
const ServicesPage = lazy(() => import("@/pages/ServicesPage"))
const ServiceDetailPage = lazy(() => import("@/pages/ServiceDetailPage"))
const ServiceCityPage = lazy(() => import("@/pages/ServiceCityPage"))
const GalleryPage = lazy(() => import("@/pages/GalleryPage"))
const ContactPage = lazy(() => import("@/pages/ContactPage"))
const FAQPage = lazy(() => import("@/pages/FAQPage"))
const CityPage = lazy(() => import("@/pages/CityPage"))
const AdminPage = lazy(() => import("@/pages/AdminPage"))
const NotFound = lazy(() => import("@/pages/not-found"))
const JKChat = lazy(() => import("@/components/jk-chat"))

function PageFallback() {
  return <div className="min-h-screen bg-white" role="status" aria-live="polite" aria-label="Loading page" />
}

function Router() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/services" component={ServicesPage} />
        <Route path="/services/:slug" component={ServiceDetailPage} />
        <Route path="/services/:service/:city" component={ServiceCityPage} />
        <Route path="/gallery" component={GalleryPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/faq" component={FAQPage} />
        <Route path="/cities/:city" component={CityPage} />
        <Route path="/admin" component={AdminPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  )
}

const loadChat = () => import("@/components/jk-chat")

/**
 * The assistant, split so the button never waits on the panel.
 *
 * `AssistantLauncher` is an ordinary eager component: it is in the main bundle
 * and in the prerendered HTML, so the AI button is painted before React has
 * even hydrated. The panel — Framer Motion, the gallery, the whole widget — is
 * a lazy chunk that starts downloading when the browser goes idle, or sooner if
 * the visitor hovers the button. A click before it arrives keeps the launcher
 * on screen and opens the panel the moment it lands, so nothing is lost.
 *
 * Previously the button itself waited on a 3s idle callback, then the chunk,
 * then a second 2s idle callback inside the widget.
 */
declare global {
  interface Window { __jkChatWanted?: boolean }
}

function Assistant() {
  // "button": only the eager launcher is on screen. "widget": the chat chunk has
  // arrived and owns its own launcher, so opening is a state flip, not a load.
  const [phase, setPhase] = React.useState<"button" | "widget">("button")
  const [autoOpen, setAutoOpen] = React.useState(false)

  const open = React.useCallback(() => {
    setAutoOpen(true)
    setPhase("widget")
  }, [])

  React.useEffect(() => {
    // A tap that landed on the prerendered button before this bundle hydrated
    // was recorded by the inline script in index.html — honour it now.
    if (window.__jkChatWanted) {
      open()
      return
    }
    // Otherwise warm the chunk while the browser has nothing better to do, and
    // mount the widget once it lands so the first tap opens instantly.
    let cancelled = false
    const warm = () => {
      void loadChat().then(() => {
        if (!cancelled) setPhase("widget")
      })
    }
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(warm, { timeout: 3000 })
      return () => {
        cancelled = true
        cancelIdleCallback(id)
      }
    }
    const timer = setTimeout(warm, 2500)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [open])

  if (phase === "button") {
    return <AssistantLauncher onOpen={open} onPrefetch={loadChat} />
  }

  return (
    <Suspense fallback={<AssistantLauncher busy onOpen={() => {}} />}>
      <JKChat startOpen={autoOpen} />
    </Suspense>
  )
}

function App() {
  return (
    // reducedMotion="user" makes every Framer Motion animation in the tree honor
    // the OS-level prefers-reduced-motion setting automatically, so individual
    // components don't each need their own useReducedMotion() check.
    <MotionConfig reducedMotion="user">
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <ScrollProgress />
        <Router />
        <Assistant />
      </WouterRouter>
    </MotionConfig>
  )
}

export default App
