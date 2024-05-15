// public/service-worker.js

self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('Podkast').then(function(cache) {
        return cache.addAll([
          // List of URLs to cache
          '/',
          '/index.html',
          // Add other static assets like CSS, JS, images, etc.
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
  