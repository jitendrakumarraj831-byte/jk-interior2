import { lazy, Suspense } from "react"
import { Switch, Route, Router as WouterRouter } from "wouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SpeedInsights } from "@vercel/speed-insights/react"
import ScrollProgress from "@/components/scroll-progress"
import MobileBottomNav from "@/components/mobile-bottom-nav"

const HomePage = lazy(() => import("@/pages/HomePage"))
const AboutPage = lazy(() => import("@/pages/AboutPage"))
const ServicesPage = lazy(() => import("@/pages/ServicesPage"))
const GalleryPage = lazy(() => import("@/pages/GalleryPage"))
const ContactPage = lazy(() => import("@/pages/ContactPage"))
const FAQPage = lazy(() => import("@/pages/FAQPage"))
const CityPage = lazy(() => import("@/pages/CityPage"))
const BlogPage = lazy(() => import("@/pages/BlogPage"))
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"))
const AdminPage = lazy(() => import("@/pages/AdminPage"))
const NotFound = lazy(() => import("@/pages/not-found"))
const JKChat = lazy(() => import("@/components/jk-chat"))
const LeadPopup = lazy(() => import("@/components/lead-popup"))
const ExitIntent = lazy(() => import("@/components/exit-intent"))

const queryClient = new QueryClient()

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
        <Route path="/gallery" component={GalleryPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/faq" component={FAQPage} />
        <Route path="/cities/:city" component={CityPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/blog/:slug" component={BlogPostPage} />
        <Route path="/admin" component={AdminPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <ScrollProgress />
        <Router />
        <MobileBottomNav />
        <Suspense fallback={null}>
          <JKChat />
        </Suspense>
        <Suspense fallback={null}>
          <LeadPopup />
        </Suspense>
        <Suspense fallback={null}>
          <ExitIntent />
        </Suspense>
        <SpeedInsights />
      </WouterRouter>
    </QueryClientProvider>
  )
}

export default App
