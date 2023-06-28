import React, { useEffect, useState } from "react";

const SwDev = () => {
    const [showInstallTag, setShowInstallTag] = useState(true)
    const [showNotifPermTag, setShowNotifPermTag] = useState(false)
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

    // notification-------------
    if (Notification.permission == "default") {
      setShowNotifPermTag(true)
    }
    
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
    
    const showConfirmNotify = ()=>{
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready.then(sw=>{
          sw.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: "BNbqX8M5NJJfs_IcL_5Gfisx7FkOYHtYniD4QMJq1RB4DeQsOmGo3lO-zzurFEqTUwtrqQHKb62p_TzxPU552yI"
          }).then(subscription=>{
            fetch("https://pushnotif.azhadev.ir/api/push-subscribe",{
              method: "post",
              body: JSON.stringify(subscription),        
            }).then(res=>{
              return res.json()
            }).then(response=>{
              console.log(response);
              alert("این کد رو ذخیره کنید : "+ response.user_code)
            })
          })
        })
      }
    }

    const handleShowNotifPermission = ()=>{
      Notification.requestPermission((res)=>{
        if (res == "granted") {
          showConfirmNotify()
        }else{
          console.log("Blocked...!");
        }
      })
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

    {
      showNotifPermTag && (
        <div style={{position:"fixed", width:"100%", height:"50px", background:"gray", color:"white", bottom:"50px", textAlign:"center", paddingTop:"15px"}} onClick={handleShowNotifPermission}>
                Please click here to receive notifications
        </div>
      )
    }
    </>
  );
};

export default SwDev;
