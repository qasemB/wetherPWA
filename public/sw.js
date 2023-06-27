const staticItems = [
    "/",
    "/index.html",
    "/static/js/main.chunk.js",
    "/static/js/vendors~main.chunk.js",
    "/static/js/bundle.js",
    "/assets/css/bootstrap.css",
    "/assets/css/bootstrap.min.css",
    "/assets/fontawesome/css/all.css",
    "/assets/css/style.css",
    "/manifest.json",
    "assets/images/weather/usual-mini.jpg"
]
const STATIC_CACHE = "cache_v1"

self.addEventListener("install", function(e){
    e.waitUntil(
        caches.open(STATIC_CACHE).then(cache=>{
            cache.addAll(staticItems)
        })
    )
}) 

self.addEventListener('activate', ()=>{
    // console.log("activateed...");
})

self.addEventListener('fetch', (e)=>{
    e.respondWith(
        caches.match(e.request).then(res=>{
            return res || fetch(e.request)
        })
    )
    // console.log("fetch:", e.request.url);
})