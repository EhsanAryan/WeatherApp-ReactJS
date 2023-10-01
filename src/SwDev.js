import React, { useEffect, useState } from 'react';

const SwDev = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallTag, setShowInstallTag] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    const handleShowInstallPrompt = () => {
        if (deferredPrompt) {
            setShowInstallTag(false);
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((response) => {
                console.log(response);
                if (response.outcome === "accepted") {
                    console.log("User accepted the install prompt.");
                }
                else if (response.outcome === "dismissed") {
                    setIsDismissed(true);
                    console.log("User dismissed the install prompt.");
                }
            });
            setDeferredPrompt(null);
        }
    }

    const handleCloseInstallPrompt = (ev) => {
        ev.stopPropagation();
        setShowInstallTag(false);
    }

    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("./sw.js")
                .then((response) => {
                    // console.log("Registered...");
                    // console.log(response);
                })
                .catch((error) => {
                    // console.log("Error:");
                    // console.log(error);
                });
        }

        window.addEventListener("beforeinstallprompt", (ev) => {
            if (!window.matchMedia("(display-mode: standalone)").matches) {
                setShowInstallTag(true);
            }
            ev.preventDefault();
            setDeferredPrompt(ev);
            return false;
        });
    }, []);

    return (
        <div
            onClick={handleShowInstallPrompt}
            className={`install-tag ${showInstallTag && !isDismissed ? "active" : ""}`}
        >
            <span className="close-icon" onClick={(ev) => handleCloseInstallPrompt(ev)}>X</span>
            برای نصب برنامه‌ی PWA وبسایت، کلیک کنید.
        </div>
    );
}

export default SwDev;
