// named cache in Cache Storage
const CACHE_NAME = 'mishow-app-v1';

// list of requests whose responses will be pre-cached at install
const INITIAL_CACHED_RESOURCES = [
  '/',
  '/offline.html',
  '/assets/css/style.css',
  '/assets/image/icon-192x192.png',
  '/assets/image/icon-256x256.png',
  '/assets/image/icon-384x384.png',
  '/assets/image/icon-512x512.png',
  '/assets/image/logo.png',
  '/assets/js/main.js',
];

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      cache.addAll(INITIAL_CACHED_RESOURCES);
    })()
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      try {
        // Try to fetch the resource from the network.
        const fetchResponse = await fetch(event.request);

        // Save the resource in the cache.
        cache.put(event.request, fetchResponse.clone());

        // And return it.
        return fetchResponse;
      } catch (e) {
        // Fetching didn't work get the resource from the cache.
        const cachedResponse = await cache.match(event.request);

        // And return it.
        return cachedResponse;
      }
    })()
  );
});
