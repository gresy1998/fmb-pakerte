/* Service worker FMB KELUARGA PAK ERTE: hanya menyimpan berkas aplikasi (tampilan). DATA KEUANGAN TIDAK PERNAH disimpan di sini. */
const CACHE = 'fmb-1795143605310';
const FILES = ["./","app.css","chunk-p474dhax.js","chunk-b55r8kt4.js","app.js","chunk-ht50km0c.js","chunk-916xetda.js","chunk-hnzdyq9p.js","favicon.svg","chunk-mh2fah8e.js","index.html","chunk-qnw2n5cd.js","chunk-pr6mdmt3.js","chunk-0xfgk1j1.js","chunk-yjvtkytc.js","chunk-mfdzrbje.js","icons/logo.svg","icons/icon-maskable-512.png","icons/icon-192.png","icons/apple-touch-icon.png","icons/logo-maskable.svg","icons/icon-512.png","chunk-g5mez7b0.js","chunk-sa9kvqsx.js","chunk-xyrnzg4g.js","manifest.webmanifest"];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== location.origin || u.pathname.endsWith('/config.js')) return;   // API (lintas-origin, POST) tidak disentuh
  if (r.mode === 'navigate') { e.respondWith(fetch(r).catch(() => caches.match('./'))); return; }
  e.respondWith(caches.match(r).then((hit) => hit || fetch(r).then((res) => { const cp = res.clone(); caches.open(CACHE).then((c) => c.put(r, cp)); return res; })));
});
