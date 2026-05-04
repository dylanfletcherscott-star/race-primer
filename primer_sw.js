// Race Day Primer — Service Worker
// Caches the app for offline use after first visit

const CACHE = 'race-primer-v1';
const ASSETS = [
  'DylanFletcher_RaceDayPrimer.html',
  'primer.webmanifest',
  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,900;1,700;1,900&family=Barlow:wght@300;400;500;600;700&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
