import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { SpeedInsights } from "@vercel/speed-insights/react";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
    <SpeedInsights />
  </HelmetProvider>
);

// Register service worker asynchronously after page load to avoid blocking render
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(() => {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }, { timeout: 5000 });
  } else {
    (window as Window).addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    });
  }
}
