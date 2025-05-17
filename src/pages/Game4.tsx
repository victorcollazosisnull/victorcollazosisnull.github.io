import { Unity, useUnityContext } from "react-unity-webgl";

function Game4() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "/Game4/Game4.loader.js",
    dataUrl: "/Game4/Game4.data",
    frameworkUrl: "/Game4/Game4.framework.js",
    codeUrl: "/Game4/Game4.wasm",
  });

  return (
    <div className="centered-container">
      <div className="centered-content">
        <h1 className="centered-title">Game 4</h1>

        {/* AQUÍ debes poner el nuevo Unity con tamaño fijo */}
        <Unity
          unityProvider={unityProvider}
          style={{ width: "1280px", height: "720px" }}
        />
      </div>
    </div>
  );
}

export default Game4;