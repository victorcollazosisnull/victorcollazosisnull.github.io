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

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const playerName = user ? user.email : "Invitado";

  console.log("Jugador a enviar a Unity:", playerName); // ✅ aquí se imprime

  const timeout = setTimeout(() => {
  sendMessage("GameSession", "SetPlayerName", playerName);
}, 2000);

  const focusTimeout = setTimeout(() => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.setAttribute("tabindex", "-1");
      canvas.blur();
    }
  }, 500);

  return () => {
    clearTimeout(timeout);
    clearTimeout(focusTimeout);
    delete window.SendDataToReact;

    unload().then(() => {
      const canvas = document.querySelector("canvas");
      if (canvas) canvas.remove();
    });
  };
}, [sendMessage, unload]);

  // Aquí agregas la función que llamará al método Unity
  const handleResetRanking = () => {
    // El primer parámetro es el nombre del GameObject en Unity
    // El segundo el nombre del método público sin parámetros
    sendMessage("RankingResetter ", "ResetRanking");
  };

  return (
    <div className="centered-container">
      <div className="centered-content">
        <h1 className="centered-title">Game 3</h1>

        <Unity unityProvider={unityProvider} className="responsive-unity" />

        {/* Botón para resetear ranking */}
        <button
          onClick={handleResetRanking}
          style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
        >
          Resetear Ranking
        </button>
      </div>
    </div>
  );
}

export default Game3;
