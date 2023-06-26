import React, { useEffect, useState } from "react";

const SwDev = () => {
    const [showInstallTag, setShowInstallTag] = useState(true)
    let deferredPrompt;
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then((res) => {
        console.log("registered...");
      });
    }


    window.addEventListener("beforeinstallprompt", (e) => {
        console.log("beforeinstallprompt");
      e.preventDefault();
      deferredPrompt = e;
      return false;
    });
    
}, []);

    const handleShowInstallPrompt = ()=>{
        if (deferredPrompt) {
            deferredPrompt.prompt();
            setShowInstallTag(false)
            deferredPrompt.userChoice.then((choiceRes) => {
              console.log(choiceRes.outcome);
              if (choiceRes.outcome === "accepted") {
                console.log("User accepted the install prompt.");
              } else if (choiceRes.outcome === "dismissed") {
                console.log("User dismissed the install prompt");
              }
            });
            deferredPrompt = null;
          }
    }

  return (
    <>
    {
        showInstallTag && (
            <div style={{position:"fixed", width:"100%", height:"50px", background:"blue", color:"white", bottom:"0", textAlign:"center", paddingTop:"15px"}} onClick={handleShowInstallPrompt}>
                Please install this app...
            </div>
        )
    }
    </>
  );
};

export default SwDev;
