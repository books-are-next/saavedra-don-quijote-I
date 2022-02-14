/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-f87a5fe';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./don_quijote_de_la_mancha_002.html","./don_quijote_de_la_mancha_005.html","./don_quijote_de_la_mancha_006.html","./don_quijote_de_la_mancha_007.html","./don_quijote_de_la_mancha_008.html","./don_quijote_de_la_mancha_009.html","./don_quijote_de_la_mancha_010.html","./don_quijote_de_la_mancha_011.html","./don_quijote_de_la_mancha_012.html","./don_quijote_de_la_mancha_013.html","./don_quijote_de_la_mancha_014.html","./don_quijote_de_la_mancha_015.html","./don_quijote_de_la_mancha_016.html","./don_quijote_de_la_mancha_017.html","./don_quijote_de_la_mancha_018.html","./don_quijote_de_la_mancha_019.html","./don_quijote_de_la_mancha_020.html","./don_quijote_de_la_mancha_021.html","./don_quijote_de_la_mancha_022.html","./don_quijote_de_la_mancha_023.html","./don_quijote_de_la_mancha_024.html","./don_quijote_de_la_mancha_025.html","./don_quijote_de_la_mancha_026.html","./don_quijote_de_la_mancha_027.html","./don_quijote_de_la_mancha_028.html","./don_quijote_de_la_mancha_029.html","./don_quijote_de_la_mancha_030.html","./don_quijote_de_la_mancha_031.html","./don_quijote_de_la_mancha_032.html","./don_quijote_de_la_mancha_033.html","./don_quijote_de_la_mancha_034.html","./don_quijote_de_la_mancha_035.html","./don_quijote_de_la_mancha_036.html","./don_quijote_de_la_mancha_037.html","./don_quijote_de_la_mancha_038.html","./don_quijote_de_la_mancha_039.html","./don_quijote_de_la_mancha_040.html","./don_quijote_de_la_mancha_041.html","./don_quijote_de_la_mancha_042.html","./don_quijote_de_la_mancha_043.html","./don_quijote_de_la_mancha_044.html","./don_quijote_de_la_mancha_045.html","./don_quijote_de_la_mancha_046.html","./don_quijote_de_la_mancha_047.html","./don_quijote_de_la_mancha_048.html","./don_quijote_de_la_mancha_049.html","./don_quijote_de_la_mancha_050.html","./don_quijote_de_la_mancha_051.html","./don_quijote_de_la_mancha_052.html","./don_quijote_de_la_mancha_053.html","./don_quijote_de_la_mancha_054.html","./don_quijote_de_la_mancha_055.html","./don_quijote_de_la_mancha_056.html","./don_quijote_de_la_mancha_057.html","./don_quijote_de_la_mancha_058.html","./don_quijote_de_la_mancha_059.html","./don_quijote_de_la_mancha_060.html","./don_quijote_de_la_mancha_061.html","./don_quijote_de_la_mancha_062.html","./don_quijote_de_la_mancha_063.html","./don_quijote_de_la_mancha_064.html","./don_quijote_de_la_mancha_065.html","./favicon.png","./index.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image002.jpg","./resources/image003.png","./resources/kniha1.jpg","./resources/kniha2.jpg","./resources/obalka.jpg","./resources/predmluva.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
