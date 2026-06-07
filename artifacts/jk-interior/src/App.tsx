import { lazy, Suspense } from "react"
import { Switch, Route, Router as WouterRouter } from "wouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ScrollProgress from "@/components/scroll-progress"

const HomePage = lazy(() => import("@/pages/HomePage"))
const AboutPage = lazy(() => import("@/pages/AboutPage"))
const ServicesPage = lazy(() => import("@/pages/ServicesPage"))
const GalleryPage = lazy(() => import("@/pages/GalleryPage"))
const ContactPage = lazy(() => import("@/pages/ContactPage"))
const FAQPage = lazy(() => import("@/pages/FAQPage"))
const CityPage = lazy(() => import("@/pages/CityPage"))
const AdminPage = lazy(() => import("@/pages/AdminPage"))
const JKChat = lazy(() => import("@/components/jk-chat"))

const queryClient = new QueryClient()

function PageFallback() {
  return <div className="min-h-screen bg-white" aria-hidden="true" />
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
        <Route path="/admin" component={AdminPage} />
        <Route>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Page Not Found</h1>
              <a href="/" className="text-blue-600 hover:underline mt-4 block">Go home</a>
            </div>
          </div>
        </Route>
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
