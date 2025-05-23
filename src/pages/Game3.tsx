import React, { useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function Game3() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "/Game3/Game3.loader.js",
    dataUrl: "/Game3/Game3.data",
    frameworkUrl: "/Game3/Game3.framework.js",
    codeUrl: "/Game3/Game3.wasm",
  });

  const [mensaje, setMensaje] = useState("Esperando mensaje...");

  useEffect(() => {
    window.SendDataToReact = function (msg) {
      console.log("Mensaje recibido de Unity:", msg);
      setMensaje(msg);
    };

    return () => {
      delete window.SendDataToReact;
    };
  }, []);

  return (
    <div className="centered-container">
      <div className="centered-content">
        <h1 className="centered-title">Game 3</h1>
        <Unity unityProvider={unityProvider} className="responsive-unity" />
        <div>
          <h2>Mensaje desde Unity:</h2>
          <p>{mensaje}</p>  {}
        </div>
      </div>
    </div>
  );
}

export default Game3;