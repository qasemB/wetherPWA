self.addEventListener('install', ()=>{
    console.log('installed...');
})

self.addEventListener('activate', ()=>{
    console.log("activateed...");
})

self.addEventListener('fetch', (e)=>{
    console.log("fetch:", e.request.url);
})