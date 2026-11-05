// Service Worker for Százszorszép Kozmetika PWA
const CACHE_NAME = 'szaszszorszep-pwa-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Pass-through hálózati kezelő a Chrome PWA telepíthetőségi követelményéhez
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
