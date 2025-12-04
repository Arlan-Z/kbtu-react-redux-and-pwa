const APP_SHELL_CACHE = 'app-shell-v1'
const RUNTIME_CACHE = 'runtime-cache-v1'
const API_CACHE = 'api-cache-v1'

const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/vite.svg',
]

const FALLBACK_BUILD_ASSETS = ['/assets/index.css', '/assets/index.js', '/src/main.tsx', '/src/index.css']

self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(
    (async () => {
      const cache = await caches.open(APP_SHELL_CACHE)
      const preCache = new Set(APP_SHELL)
      const manifestEntries = (self.__WB_MANIFEST || []).map((entry) => entry.url)
      ;[...manifestEntries, ...FALLBACK_BUILD_ASSETS].forEach((url) => {
        if (url) {
          preCache.add(url.startsWith('/') ? url : `/${url}`)
        }
      })
      const requests = Array.from(preCache)
      for (const request of requests) {
        try {
          await cache.add(request)
        } catch (error) {
          console.warn('Skipping asset during precache', request, error)
        }
      }
    })()
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys()
      await Promise.all(
        cacheNames
          .filter((name) => ![APP_SHELL_CACHE, RUNTIME_CACHE, API_CACHE].includes(name))
          .map((name) => caches.delete(name))
      )
      await self.clients.claim()
    })()
  )
})

const isNavigationRequest = (request) => request.mode === 'navigate'

const cacheFirstAsset = async (request) => {
  const cache = await caches.open(RUNTIME_CACHE)
  const cached = await cache.match(request)
  if (cached) return cached

  try {
    const response = await fetch(request)
    cache.put(request, response.clone())
    return response
  } catch (error) {
    if (cached) return cached
    throw error
  }
}

const handleApiRequest = async (request) => {
  const cache = await caches.open(API_CACHE)
  try {
    const response = await fetch(request)
    cache.put(request, response.clone())
    return response
  } catch (error) {
    const cached = await cache.match(request)
    if (cached) return cached
    return new Response(
      JSON.stringify({ message: 'Offline: cached data unavailable' }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event

  if (request.method !== 'GET') return

  const url = new URL(request.url)

  if (isNavigationRequest(request)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(APP_SHELL_CACHE)
        try {
          const networkResponse = await fetch(request)
          cache.put('/index.html', networkResponse.clone())
          return networkResponse
        } catch (error) {
          const cachedPage = await cache.match('/index.html')
          if (cachedPage) return cachedPage
          return new Response('Offline', { status: 503 })
        }
      })()
    )
    return
  }

  if (url.hostname === 'rickandmortyapi.com') {
    event.respondWith(handleApiRequest(request))
    return
  }

  if (
    url.origin === self.location.origin &&
    (request.destination === 'style' ||
      request.destination === 'script' ||
      request.destination === 'image' ||
      request.destination === 'font')
  ) {
    event.respondWith(cacheFirstAsset(request))
    return
  }

  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirstAsset(request))
  }
})