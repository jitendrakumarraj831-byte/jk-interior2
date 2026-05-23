const CACHE_NAME = 'jk-interior-v1'
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
        console.log('[SW] Precache failed, app will work with partial offline support')
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
  if (request.method !== 'GET' || !url.origin.includes(self.location.origin)) {
    return
  }

  // Network-first strategy: try network, fall back to cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful responses
        if (response && response.status === 200) {
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone)
          })
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
