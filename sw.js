/* Service worker FMB KELUARGA PAK ERTE: hanya menyimpan berkas aplikasi (tampilan). DATA KEUANGAN TIDAK PERNAH disimpan di sini. */
const CACHE = 'fmb-1795164986698';
const FILES = ["./","chunk-m5wzxadp.js","app.css","chunk-vtmk1a7z.js","app.js","favicon.svg","index.html","chunk-e69d6qjr.js","chunk-xt9atfmc.js","chunk-w56bb42t.js","chunk-n41e95rt.js","chunk-aqedm11n.js","chunk-ke14x6zb.js","chunk-hkjg59mq.js","chunk-vsjmksfh.js","icons/logo.svg","icons/icon-maskable-512.png","icons/icon-192.png","icons/apple-touch-icon.png","icons/logo-maskable.svg","icons/icon-512.png","chunk-hwa37n4j.js","chunk-znrapejj.js","chunk-ksv1m2m7.js","chunk-55r9kqdn.js","manifest.webmanifest"];
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
