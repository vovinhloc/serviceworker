const appCacheName = "v2";
const appCacheItems = ["./index.js", "./index.html", "./style.css"];
self.addEventListener("install", (ev) => {
  console.log("Service Worker is installed! [ev]: ", ev);
  ev.waitUntil(
    caches
      .open(appCacheName)
      .then((cache) => {
        console.log("SW is catching");
        cache.addAll(appCacheItems);
      })
      .then(() => self.skipWaiting())
  );
});
self.addEventListener("activate", (ev) => {
  console.log("Service Worker is actived ! [ev]: ", ev);
  ev.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName != appCacheName) {
            console.log("deleting cache name = ", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (ev) => {
  console.log("Service Worker is fetching [ev]:", ev);
  ev.respondWith(fetch(ev.request).catch(() => caches.match(ev.request)));
});
