/* Service worker FMB KELUARGA PAK ERTE: hanya menyimpan berkas aplikasi (tampilan). DATA KEUANGAN TIDAK PERNAH disimpan di sini. */
const CACHE = 'fmb-1795142794564';
const FILES = ["./","app.css","chunk-d0vnpsdy.js","chunk-qv7zvvfk.js","app.js","chunk-2n5tc3z4.js","favicon.svg","chunk-yzdxt0f0.js","index.html","chunk-0t5jj0ts.js","chunk-t89kdn0n.js","chunk-r3rtz67d.js","chunk-sc636yp0.js","icons/logo.svg","icons/icon-maskable-512.png","icons/icon-192.png","icons/apple-touch-icon.png","icons/logo-maskable.svg","icons/icon-512.png","chunk-5z45z88a.js","chunk-9gzw8tw1.js","chunk-g68agb6f.js","chunk-qyym3ajx.js","manifest.webmanifest","chunk-8ra3b0nq.js","chunk-0eajv35p.js"];
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
