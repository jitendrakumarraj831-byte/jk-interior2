// JK Interior service worker.
//
// v3 changes the strategy, not just the contents, so the cache is renamed to
// force the activate handler below to drop v2 outright.
//
// v2 was network-first for *everything*. That meant the cache was only ever an
// offline fallback: every visit still went to the network for every hashed JS
// chunk, every font and every photo before anything could render, and the worker
// added a cache write on top of each one. A repeat visitor got no speed benefit
// at all from having a service worker — which is the whole reason to ship one.
//
// v3 routes by what the request actually is:
//
//   • Build output (/chunks/*, /assets/*) is content-hashed by Vite — the bytes
//     at a given URL can never change. Cache-first, no revalidation, no network
//     on a warm cache.
//   • Fonts and images are immutable in practice (a new photo gets a new name)
//     and are the bulk of the page weight. Cache-first, with a background
//     refresh so a replaced file is picked up on the visit after next.
//   • Navigations and everything else are network-first, so the prerendered HTML
//     — and therefore which hashed chunks the page asks for — is always current.
//   • /api/* is never touched (see below).
const CACHE_NAME = 'jk-interior-v3'

// Deliberately tiny. The old list precached /logo.png, a 35 kB image that only
// appears in the footer behind a `loading="lazy"` attribute — i.e. the install
// step spent bandwidth, during the first page load, on a file the first page
// load specifically avoids fetching.
const PRECACHE_URLS = ['/']

/** Content-hashed build output: safe to serve from cache forever. */
function isImmutableBuildAsset(pathname) {
  return pathname.startsWith('/chunks/') || pathname.startsWith('/assets/')
}

/** Fonts and photos: cache-first, refreshed in the background. */
function isStaticMedia(pathname) {
  return (
    pathname.startsWith('/fonts/') ||
    pathname.startsWith('/images/') ||
    /\.(?:woff2?|avif|webp|png|jpe?g|svg|ico)$/i.test(pathname)
  )
}

function isNavigation(request, pathname) {
  return request.mode === 'navigate' || request.destination === 'document' || pathname.endsWith('.html')
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      // Precache failure must never block activation — the worker still works,
      // it just starts with an empty cache.
      .catch(() => {}),
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) => Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))))
      .then(() => self.clients.claim()),
  )
})

// URLs already revalidated by this worker instance. The media refresh below is a
// once-per-worker job, not a once-per-page-view one: without this, every cached
// photo on a page cost a redundant CacheStorage write on every single navigation.
const revalidated = new Set()

/** Store a response copy without ever letting a cache error surface to the page. */
function putInCache(request, response) {
  if (!response || response.status !== 200 || response.type !== 'basic') return
  const clone = response.clone()
  caches
    .open(CACHE_NAME)
    .then((cache) => cache.put(request, clone))
    .catch(() => {})
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  let url
  try {
    url = new URL(request.url)
  } catch {
    return
  }
  if (url.origin !== self.location.origin) return

  // Never touch the API.
  //
  // GET /api/leads returns the whole leads table — real customers' names and
  // phone numbers — behind an admin key. Caching that wrote it into CacheStorage
  // on whatever device the dashboard was opened on, where it outlived the session
  // and would be replayed offline with no key checked at all. Chat replies are
  // per-conversation and equally pointless to cache.
  if (url.pathname === '/api' || url.pathname.startsWith('/api/')) return

  // The worker itself must always come from the network, or a bad worker can
  // never be replaced.
  if (url.pathname === '/sw.js') return

  const pathname = url.pathname

  // ── Cache-first: hashed build output ──────────────────────────────────────
  if (isImmutableBuildAsset(pathname)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached
        return fetch(request).then((response) => {
          putInCache(request, response)
          return response
        })
      }),
    )
    return
  }

  // ── Cache-first with background refresh: fonts and images ─────────────────
  if (isStaticMedia(pathname)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          // Refresh out of band so a photo replaced under the same filename lands
          // for the next visit, without making this one wait on the network.
          //
          // `cache: 'reload'` is what makes that actually happen. A default fetch
          // consults the HTTP cache first, and this site's own headers declare
          // /images fresh for 30 days and /fonts immutable for a year — so the
          // "refresh" was answered from that cache and could never see a new
          // file. 'reload' goes past it to the server.
          if (!revalidated.has(request.url)) {
            revalidated.add(request.url)
            event.waitUntil(
              fetch(request, { cache: 'reload' })
                .then((response) => putInCache(request, response))
                .catch(() => {}),
            )
          }
          return cached
        }
        return fetch(request).then((response) => {
          putInCache(request, response)
          return response
        })
      }),
    )
    return
  }

  // ── Network-first: navigations, and anything not classified above ─────────
  event.respondWith(
    fetch(request)
      .then((response) => {
        putInCache(request, response)
        return response
      })
      .catch(() =>
        caches.match(request).then((cached) => {
          if (cached) return cached
          // An offline navigation falls back to the cached home page rather than
          // a bare error string, so the site still opens with its shell intact.
          if (isNavigation(request, pathname)) {
            return caches.match('/').then(
              (home) => home || new Response('Offline — content not available', { status: 503 }),
            )
          }
          return new Response('Offline — content not available', { status: 503 })
        }),
      ),
  )
})
