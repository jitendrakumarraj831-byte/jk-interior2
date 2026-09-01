import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { SpeedInsights } from "@vercel/speed-insights/react";
import App from "./App";
import "./index.css";

/** Matches PRERENDERED_TAG_ATTR in scripts/prerender.ts. */
const PRERENDERED_TAG_ATTR = "data-jk-prerendered";

/**
 * Retires the SEO tags baked into the prerendered HTML, once react-helmet-async
 * has inserted the live ones.
 *
 * Every route ships as static HTML with a <title>, canonical, description and
 * the OG/Twitter set already in <head> (see scripts/prerender.ts) — that is the
 * whole point of prerendering, and it is what non-JS crawlers read. But
 * react-helmet-async has no way to recognise those tags on mount, so it simply
 * appends its own alongside them: a crawler that *does* execute JS then finds
 * two <title>s, two canonicals and two descriptions on every page. The values
 * are identical, so nothing was ever contradicted — it is duplicate markup, and
 * trivially avoidable.
 *
 * Timing matters in both directions, which is why this runs on a frame after
 * render rather than before it: clear the static tags too early and there is a
 * window with no canonical at all; never clear them and the duplicates stay.
 * Each tag is only removed once a same-kind replacement is actually present, so
 * the worst case is that the page keeps the static tag it already had.
 */
function dropPrerenderedSeoTags() {
  const sweep = () => {
    let remaining = 0;
    for (const stale of Array.from(document.querySelectorAll(`head [${PRERENDERED_TAG_ATTR}]`))) {
      const tag = stale.tagName.toLowerCase();
      const replaced = Array.from(document.head.querySelectorAll(tag)).some(
        (el) =>
          el !== stale &&
          !el.hasAttribute(PRERENDERED_TAG_ATTR) &&
          el.getAttribute("name") === stale.getAttribute("name") &&
          el.getAttribute("property") === stale.getAttribute("property") &&
          el.getAttribute("rel") === stale.getAttribute("rel"),
      );
      if (replaced) stale.remove();
      else remaining++;
    }
    return remaining;
  };

  // Helmet writes its tags from an effect, which lands some time after
  // createRoot().render() returns — React commits on its own schedule, so
  // there is no single frame this can be timed to. Watching <head> runs the
  // sweep exactly when the replacements actually arrive.
  const observer = new MutationObserver(() => {
    if (sweep() === 0) observer.disconnect();
  });
  observer.observe(document.head, { childList: true });

  // Safety net: if Helmet never mounts (a JS error, a route that renders no
  // SeoHead), stop watching and leave the static tags exactly as they are —
  // stripping only the marker, never the tag itself. A page keeping its
  // prerendered <title> and canonical is correct; a page with neither is not.
  setTimeout(() => {
    observer.disconnect();
    sweep();
    document
      .querySelectorAll(`head [${PRERENDERED_TAG_ATTR}]`)
      .forEach((el) => el.removeAttribute(PRERENDERED_TAG_ATTR));
  }, 5000);
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
    <SpeedInsights />
  </HelmetProvider>
);

dropPrerenderedSeoTags();

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
