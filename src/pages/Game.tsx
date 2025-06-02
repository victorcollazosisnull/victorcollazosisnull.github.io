import { Unity, useUnityContext } from "react-unity-webgl";

function Game() {
    const { unityProvider, sendMessage } = useUnityContext({
        loaderUrl: "/UnityReact.loader.js",
        dataUrl: "/UnityReact.data.unityweb",
        frameworkUrl: "/UnityReact.framework.js.unityweb",
        codeUrl: "/UnityReact.wasm.unityweb",
    });

    function handleClickSpawnEnemies() {
        sendMessage("GameObject", "SpawnEnemies");
    }

    return (
        <div className="centered-container">
            <div className="centered-content">
                <h1 className="centered-title">React + Unity / Tecsup</h1>

                <div className="unity-wrapper">
                    <Unity unityProvider={unityProvider} className="responsive-unity" />
                </div>

                <div className="centered-content">
                    <button onClick={handleClickSpawnEnemies}>Spawn Enemies</button>
                </div>
            </div>
        </div>
    );
}

export default Game;