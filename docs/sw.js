// Offline support: keeps the app files on the device so it opens without internet.
const CACHE = "coin-catalog-317b9703bc";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./fonts.css", "./fonts/atkinson-400.woff2", "./fonts/atkinson-700.woff2", "./fonts/cormorant-sc-600.woff2", "./peerjs.min.js",
  "./examples/1943-cent-front.jpg", "./examples/1943-cent-back.jpg", "./examples/1921-morgan-front.jpg", "./examples/1921-morgan-back.jpg", "./examples/1944s-quarter-front.jpg", "./examples/1944s-quarter-back.jpg"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith("coin-catalog-") && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    // App files: try the network for fresh copies, fall back to the saved copy offline.
    e.respondWith(fetch(req).then((res) => {
      const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match("./index.html"))));
  } else if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    // Fonts: use the saved copy when there is one.
    e.respondWith(caches.match(req).then((r) => r || fetch(req).then((res) => {
      const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res;
    })));
  }
});
