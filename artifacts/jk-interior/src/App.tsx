import React, { lazy, Suspense } from "react"
import { Switch, Route, Router as WouterRouter } from "wouter"
import { MotionConfig } from "framer-motion"
import ScrollProgress from "@/components/scroll-progress"
import MobileCtaBar from "@/components/mobile-cta-bar"

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

function App() {
  const [showChat, setShowChat] = React.useState(false)

  React.useEffect(() => {
    // Defer chat initialization until after page is interactive
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => setShowChat(true), { timeout: 3000 })
      return
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      const timer = setTimeout(() => setShowChat(true), 2500)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    // reducedMotion="user" makes every Framer Motion animation in the tree honor
    // the OS-level prefers-reduced-motion setting automatically, so individual
    // components don't each need their own useReducedMotion() check.
    <MotionConfig reducedMotion="user">
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <ScrollProgress />
        <Router />
        <MobileCtaBar />
        {showChat && (
          <Suspense fallback={null}>
            <JKChat />
          </Suspense>
        )}
      </WouterRouter>
    </MotionConfig>
  )
}

export default App
