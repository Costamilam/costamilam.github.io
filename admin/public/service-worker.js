const version = '2.0.0';
const cacheName = `costamilam-v${version}`;

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                'service-worker.js',
                '/bundle.js',
                '/bundle.js.map',
                '/bundle.css',
                '/bundle.css.map',
                '/main.css',
                '/index.html',
                '/favicon.ico'
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
    if (event.request.url === 'service-worker.js' && navigator.onLine) {
        event.respondWith(fetch(event.request));
    } else {
        event.respondWith(
            caches.open(cacheName).then(function(cache) {
                return cache.match(event.request, { ignoreSearch: true });
            }).then(function(response) {
                return response || fetch(event.request);
            })
        );
    }
});
