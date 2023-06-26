import React, { useEffect } from "react";

const SwDev = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then((res) => {
        console.log("registered...");
      });
    }
  }, []);
  return null;
};

export default SwDev;
