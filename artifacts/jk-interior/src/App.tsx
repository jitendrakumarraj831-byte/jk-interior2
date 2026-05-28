import { Switch, Route, Router as WouterRouter } from "wouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ScrollProgress from "@/components/scroll-progress"
import JKChat from "@/components/jk-chat"
import HomePage from "@/pages/HomePage"
import AboutPage from "@/pages/AboutPage"
import ServicesPage from "@/pages/ServicesPage"
import GalleryPage from "@/pages/GalleryPage"
import ContactPage from "@/pages/ContactPage"
import FAQPage from "@/pages/FAQPage"
import CityPage from "@/pages/CityPage"
import AdminPage from "@/pages/AdminPage"

const queryClient = new QueryClient()

function Router() {
  return (
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
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <ScrollProgress />
        <Router />
        <JKChat />
      </WouterRouter>
    </QueryClientProvider>
  )
}

export default App
