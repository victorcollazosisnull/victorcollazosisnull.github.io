import { Unity, useUnityContext } from "react-unity-webgl";
import { useEffect } from "react";

function Game1() {
    const { unityProvider, sendMessage, unload } = useUnityContext({
        loaderUrl: "/Game1/Game1.loader.js",
        dataUrl: "/Game1/Game1.data",
        frameworkUrl: "/Game1/Game1.framework.js",
        codeUrl: "/Game1/Game1.wasm",
    });

    function handleRestartScene() {
        sendMessage("SceneReloader", "ReloadScene");
    }

    useEffect(() => {
        return () => {
            unload();
        };
    }, [unload]);

    return (
        <div className="centered-container">
            <div className="centered-content">
                <h1 className="centered-title">Game 1</h1>
                <div className="unity-wrapper">
                    <Unity unityProvider={unityProvider} className="responsive-unity" />
                </div>
                <div className="centered-content">
                    <button onClick={handleRestartScene}>Restart Scene</button>
                </div>
                <p>This is the first game.</p>
            </div>
        </div>
    );
}

export default Game1;