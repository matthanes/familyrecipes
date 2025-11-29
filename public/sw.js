/// <reference lib="webworker" />

/** @type {ServiceWorkerGlobalScope} */
const sw = /** @type {any} */ (self);

const CACHE_NAME = 'family-recipes-v1';

sw.addEventListener('install', (/** @type {ExtendableEvent} */ event) => {
  sw.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/recipes/',
        '/recipes/icons/icon-192x192.png',
        '/recipes/icons/icon-512x512.png'
      ]);
    })
  );
});

sw.addEventListener('activate', (/** @type {ExtendableEvent} */ event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  sw.clients.claim();
});

sw.addEventListener('fetch', (/** @type {FetchEvent} */ event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
