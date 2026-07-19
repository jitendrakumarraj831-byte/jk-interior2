import { lazy, Suspense } from "react"
import { Switch, Route, Router as WouterRouter } from "wouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ScrollProgress from "@/components/scroll-progress"

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
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <ScrollProgress />
        <Router />
        <Suspense fallback={null}>
          <JKChat />
        </Suspense>
      </WouterRouter>
    </QueryClientProvider>
  )
}

export default App
