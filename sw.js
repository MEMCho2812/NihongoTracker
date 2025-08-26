const CACHE='jp-tracker-v1';
const ASSETS=['./','./index.html','./manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k===CACHE?null:caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;e.respondWith(caches.match(r).then(res=>res||fetch(r).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>{if(r.url.startsWith(self.location.origin)) c.put(r,copy)});return resp}).catch(()=>caches.match('./index.html'))))});