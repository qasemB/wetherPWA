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
    "/assets/images/weather/usual-mini.jpg"
]
const STATIC_CACHE = "cache_v1"

self.addEventListener("install", function(e){
    // e.waitUntil(
    //     caches.open(STATIC_CACHE).then(cache=>{
    //         cache.addAll(staticItems)
    //     })
    // )
}) 

self.addEventListener('activate', ()=>{
    // console.log("activateed...");
})

self.addEventListener('fetch', (e)=>{
    // e.respondWith(
    //     caches.match(e.request).then(res=>{
    //         return res || fetch(e.request)
    //     })
    // )
    // console.log("fetch:", e.request.url);
})


//notificatio--------------
self.addEventListener('push', (event)=>{
    const notification = event.data.json()
    const options = {
        body: notification.body,
        icon: "/assets/images/codeyadIcon.png",
        image: "/assets/images/office.jpg",
        dir: "ltr",
        vibrate: [100, 50, 200],
        badge: "/assets/images/codeyadIcon.png",
        tag: "group1",
        renotify: true,
        actions: [
          {action: "confirm", title: "تایید", icon:"/assets/images/confirm.png"},
          {action: "cancel", title: "انصراف", icon:"/assets/images/cancel.png"}
        ],
        data:{
            notifUrl: notification.url
        }
      }  
    self.registration.showNotification(notification.title, options)
})