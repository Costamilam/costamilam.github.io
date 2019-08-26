const version = '1.0.0';
const cacheName = `costamilam-v${version}`;

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                '/main.js',
                '/main.css',
                '/index.html',
                '/favicon.ico',
                '/icons/icon.png',
                '/icons/icon-72x72.png',
                '/icons/icon-96x96.png',
                '/icons/icon-128x128.png',
                '/icons/icon-144x144.png',
                '/icons/icon-152x152.png',
                '/icons/icon-192x192.png',
                '/icons/icon-384x384.png',
                '/icons/icon-512x512.png'
            ]).then(function() {
                self.skipWaiting()
            });
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open(cacheName).then(function(cache) {
            return cache.match(event.request, { ignoreSearch: true });
        }).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
