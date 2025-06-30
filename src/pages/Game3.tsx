import React, { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

declare global {
  interface Window {
    SendDataToReact?: (msg: string) => void;
  }
}

function Game3() {
  const { unityProvider, sendMessage, unload } = useUnityContext({
    loaderUrl: "/Game3/Game3.loader.js",
    dataUrl: "/Game3/Game3.data",
    frameworkUrl: "/Game3/Game3.framework.js",
    codeUrl: "/Game3/Game3.wasm",
  });

  useEffect(() => {
    window.SendDataToReact = function (msg: string) {
      console.log("Mensaje recibido de Unity:", msg);
    };

    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.setAttribute("tabindex", "-1");
      canvas.blur();
    }

    return () => {
      delete window.SendDataToReact;

      try {
        sendMessage("AudioManager", "StopMusic");
        console.log("StopMusic enviado a Unity");
      } catch (error) {
        console.warn("No se pudo enviar StopMusic:", error);
      }

      unload().then(() => {
        const canvas = document.querySelector("canvas");
        if (canvas) canvas.remove();
      });
    };
  }, [sendMessage, unload]);

  return (
    <div className="centered-container">
      <div className="centered-content">
        <h1 className="centered-title">Game 3</h1>
        <Unity unityProvider={unityProvider} className="responsive-unity" />
      </div>
    </div>
  );
}

export default Game3;
