const CACHE_NAME = 'sleep-widget-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/sleep-cycle-widget/index.html',
  '/sleep-cycle-widget/manifest.json',
  '/sleep-cycle-widget/133.png',
];

// Встановлення service worker і кешування
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Очищення старих кешів при активації
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Обробка fetch-запитів
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
