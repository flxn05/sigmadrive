const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/client.js",
  "/disk.png",
  "/download.png",
  "/home.svg",
  "/icons8-cloud.png",
  "/logout.png",
  "/mobile.css",
  "/settings.svg",
  "/styles.css",
  "/test.js",
  "/update.png",
  "/upload.png",
  "/website4.js",
  "/manifest.json"
];

// Install the service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch and cache resources
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Update the service worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
