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

highResImageFiles = [
    'img/png8/apple.png',
    'img/png8/banana.png',
    'img/png8/cherry.png',
    'img/png8/coconut.png',
    'img/png8/kiwi.png',
    'img/png8/lemon.png',
    'img/png8/orange.png',
    'img/png8/strawberry.png',
    'img/png8/watermelon.png',
    'img/war/c4.png',
    'img/war/dropbomb.png',
    'img/war/floatingmine.png',
    'img/war/grenade.png',
    'img/war/handbomb.png',
    'img/war/landmine.png',
    'img/war/molotov.png',
    'img/war/nuke.png',
    'img/war/pipebomb.png',
    'img/war/tnt.png',
    'img/play.png',
    'img/big_restart_compressed.png',
    'img/skin/levelPack.png',
    'img/smasher.png',
    'img/skin/square_01.png',
    'img/skin/static_background2.png',
    'img/static_background3.png',
    'img/skin/tile1.png',
    'img/skin/tile2.png',
    'img/top_bar_new_compressed.png',
    'img/circle_background.png',
    'img/BackToLvlSelect3Compressed.png'
];

highResAllResources = [].concat(
    sharedPaths,
    highResImageFiles
);

const CACHE_NAME = "fruits_v1";

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(highResAllResources)
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
