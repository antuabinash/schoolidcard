const CACHE_NAME = 'id-card-pro-v30';
const urlsToCache = [
  './',
  'index.html',
  'app.html',
  'manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.2/cropper.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.2/cropper.min.css',
  'https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore-compat.js',
  // AI Libraries
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/vision_bundle.js',
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm/vision_wasm_internal.js',
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm/vision_wasm_internal.wasm'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cache => {
        if (cache !== CACHE_NAME) return caches.delete(cache);
      })
    ))
  );
});
