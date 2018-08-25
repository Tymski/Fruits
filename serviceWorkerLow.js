sharedPaths = [
    '/',
    './',
    'index.html',
    'index.html?launcher=true',
    'js/build.js',
    'css/bundle.css',
    'img/icons/icon192x192.png',
    'img/pack/cake_128/3.png',
    'img/pack/cake_128/37.png',
    'img/pack/cake_128/4.png',
    'img/pack/cake_128/41.png',
    'img/pack/cake_128/49.png',
    'img/xSmallCompressed.png',
    'img/pack/cake_128/5.png'
];

lowResImageFiles = [
    'img/hdc/apple-min.png',
    'img/hdc/banana-min.png',
    'img/hdc/cherry-min.png',
    'img/hdc/kiwi-min.png',
    'img/hdc/orange-min.png',
    'img/hdc/lemon-min.png',
    'img/hdc/coconut-min.png',
    'img/hdc/strawberry-min.png',
    'img/hdc/watermelon-min.png',
    'img/hdc/c4-min.png',
    'img/hdc/molotov-min.png',
    'img/hdc/tnt-min.png',
    'img/hdc/dropbomb-min.png',
    'img/hdc/floatingmine-min.png',
    'img/hdc/grenade-min.png',
    'img/hdc/handbomb-min.png',
    'img/hdc/landmine-min.png',
    'img/hdc/nuke-min.png',
    'img/hdc/pipebomb-min.png',
    'img/hdc/play-min.png',
    'img/hdc/restart-min.png',
    'img/hdc/levelPack-min.png',
    'img/hdc/smasher-min.png',
    'img/hdc/square_01-min.png',
    'img/hdc/static_background2-min.png',
    'img/hdc/static_background3-min.png',
    'img/hdc/tile1-min.png',
    'img/hdc/tile2-min.png',
    'img/hdc/top_bar-min.png',
    'img/hdc/circle_background-min.png',
    'img/hdc/backToLevelPackSelect-min.png'
];

lowResAllResources = [].concat(
    sharedPaths,
    lowResImageFiles
);

const CACHE_NAME = "fruits_v1";

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(lowResAllResources)
                .then(() => self.skipWaiting());
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(CACHE_NAME)
            .then(cache => cache.match(event.request, { ignoreSearch: true }))
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
