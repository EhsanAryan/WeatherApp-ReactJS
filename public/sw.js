self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("static").then((cache) => {
            cache.addAll([
                "/",
                "/index.html",
                "/assets/bootstrap-5.2.1-dist/css/bootstrap-reboot.min.css",
                "/assets/bootstrap-5.2.1-dist/css/bootstrap.min.css",
                "/assets/myStyles.css",
                "/assets/images/favicon.ico",
                "/assets/images/background/cold.jpg",
                "/assets/images/background/usual.jpg",
                "/assets/images/background/warm.jpg",
                "/assets/images/background/hot.jpg",
                "/assets/Font/BYekan/BYekan-webfont.eot",
                "/assets/Font/BYekan/BYekan-webfont.ttf",
                "/assets/Font/BYekan/BYekan-webfont.woff",
                "/static/js/bundle.js"
            ]);
        })
    );
});

self.addEventListener("activate", (ev) => {
    // console.log("Activated...");
    // console.log(ev);
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request.url).then((response) => {
            return response || fetch(event.request.url);
        })
    );
});