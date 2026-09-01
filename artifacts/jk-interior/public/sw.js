// Bumped from v1 so the activate handler below drops the old cache outright.
// That matters here rather than being housekeeping: v1 was written by a fetch
// handler that cached /api responses, so an admin device could be holding a
// cached copy of the leads table. Renaming the cache is what actually deletes it.
const CACHE_NAME = 'jk-interior-v2'
const PRECACHE_URLS = [
  '/',
  '/logo.png',
  '/favicon.png',
]

// Install event: precache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch(() => {
        // Fail silently if precache fails
            // Precache failed; app will work with partial offline support
      })
    })
  )
  self.skipWaiting()
})

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event: network-first strategy with fallback to cache
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests and cross-origin requests
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return
  }

  // Never touch the API.
  //
  // GET /api/leads returns the whole leads table — real customers' names and
  // phone numbers — behind an admin key. Caching that wrote it into
  // CacheStorage on whatever device the dashboard was opened on, where it
  // outlived the session and would be replayed offline with no key checked at
  // all. Chat replies are per-conversation and equally pointless to cache.
  if (url.pathname === '/api' || url.pathname.startsWith('/api/')) {
    return
  }

  // Network-first strategy: try network, fall back to cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful same-origin responses only. `response.type` guards
        // against storing an opaque cross-origin redirect result, which is
        // unusable from the cache anyway.
        if (response && response.status === 200 && response.type === 'basic') {
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone)
          }).catch(() => {})
        }
        return response
      })
      .catch(() => {
        // Fall back to cache on network failure
        return caches.match(request).then((cached) => {
          return cached || new Response('Offline - content not available', { status: 503 })
        })
      })
  )
})
