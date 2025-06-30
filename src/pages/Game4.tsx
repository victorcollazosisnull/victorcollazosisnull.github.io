import { Unity, useUnityContext } from "react-unity-webgl";
import { useEffect } from "react";

function Game4() {
    const { unityProvider, sendMessage, unload } = useUnityContext({
        loaderUrl: "/Game4/Game4.loader.js",
        dataUrl: "/Game4/Game4.data",
        frameworkUrl: "/Game4/Game4.framework.js",
        codeUrl: "/Game4/Game4.wasm",
    });

    function handleSceneRestart() {
        sendMessage("SceneManager", "ReloadScene");
    }

    useEffect(() => {
        const canvas = document.querySelector("canvas");
        if (canvas) {
            canvas.setAttribute("tabindex", "-1");
            canvas.blur();
        }

        return () => {
            try {
                sendMessage("MusicManager", "StopAllMusic");
                console.log("StopAllMusic enviado a Unity");
            } catch (error) {
                console.warn("No se pudo enviar StopAllMusic:", error);
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
                <h1 className="centered-title">Game 4</h1>

                <div className="unity-wrapper">
                    <Unity unityProvider={unityProvider} className="responsive-unity" />
                </div>

                <div className="centered-content">
                    <button onClick={handleSceneRestart}>Restart Scene</button>
                </div>
            </div>

            <div>
                <p>This is the fourth game.</p>
            </div>
        </div>
    );
}

export default Game4;
