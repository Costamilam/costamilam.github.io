importScripts('https://cdn.jsdelivr.net/npm/serviceworker-cache-polyfill@4.0.0/index.min.js');

const version = '1.0.0';
const cacheName = `costamilam-v${version}`;

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                '/android-chrome-144x144.png',
                '/android-chrome-192x192.png',
                '/android-chrome-256x256.png',
                '/android-chrome-36x36.png',
                '/android-chrome-384x384.png',
                '/android-chrome-48x48.png',
                '/android-chrome-512x512.png',
                '/android-chrome-72x72.png',
                '/android-chrome-96x96.png',
                '/apple-touch-icon-114x114-precomposed.png',
                '/apple-touch-icon-114x114.png',
                '/apple-touch-icon-120x120-precomposed.png',
                '/apple-touch-icon-120x120.png',
                '/apple-touch-icon-144x144-precomposed.png',
                '/apple-touch-icon-144x144.png',
                '/apple-touch-icon-152x152-precomposed.png',
                '/apple-touch-icon-152x152.png',
                '/apple-touch-icon-180x180-precomposed.png',
                '/apple-touch-icon-180x180.png',
                '/apple-touch-icon-57x57-precomposed.png',
                '/apple-touch-icon-57x57.png',
                '/apple-touch-icon-60x60-precomposed.png',
                '/apple-touch-icon-60x60.png',
                '/apple-touch-icon-72x72-precomposed.png',
                '/apple-touch-icon-72x72.png',
                '/apple-touch-icon-76x76-precomposed.png',
                '/apple-touch-icon-76x76.png',
                '/apple-touch-icon-precomposed.png',
                '/apple-touch-icon.png',
                '/content.html',
                '/favicon-16x16.png',
                '/favicon-194x194.png',
                '/favicon-32x32.png',
                '/favicon-back-white.svg',
                '/favicon.ico',
                '/favicon.svg',
                '/index.html',
                '/mstile-144x144.png',
                '/mstile-150x150.png',
                '/mstile-310x150.png',
                '/mstile-310x310.png',
                '/mstile-70x70.png',
                '/safari-pinned-tab.svg',
                '/js/main.js',
                '/js/helper.js',
                '/js/firebase-app.js',
                '/js/firebase-database.js',
                '/css/main.css',
                '/css/animation.css',
                '/media/costamilam.png',
                '/media/costamilam.svg',
                '/media/firebase.png',
                '/media/firebase-blue.png',
                '/media/profile.png',
                '/projects/aionabsoluto.png',
                '/projects/commandinvest.png',
                '/projects/mundialr.png',
                '/projects/plazacanela.png',
                'https://use.fontawesome.com/releases/v5.3.1/css/solid.css',
                'https://use.fontawesome.com/releases/v5.3.1/css/brands.css',
                'https://use.fontawesome.com/releases/v5.3.1/css/fontawesome.css',
                'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
                'https://cdn.jsdelivr.net/npm/typed.js@2.0.9/lib/typed.min.js',
                'https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@14.2/dist/smooth-scroll.polyfills.min.js'
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