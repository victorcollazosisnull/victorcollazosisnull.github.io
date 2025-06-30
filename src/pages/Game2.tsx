import { Unity, useUnityContext } from "react-unity-webgl";
import { useEffect } from "react";

function Game2() {
    const { unityProvider, sendMessage, unload, isLoaded } = useUnityContext({
        loaderUrl: "/Game2/Game2.loader.js",
        dataUrl: "/Game2/Game2.data",
        frameworkUrl: "/Game2/Game2.framework.js",
        codeUrl: "/Game2/Game2.wasm",
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
            console.log("Desmontando Game2, deteniendo música y descargando Unity...");

            if (isLoaded) {
                try {
                    sendMessage("AudioManager", "StopMusic");
                    console.log("Mensaje StopMusic enviado a Unity.");
                } catch (error) {
                    console.warn("Error al enviar StopMusic a Unity:", error);
                }
            } else {
                console.warn("Unity no estaba cargado. No se pudo enviar StopMusic.");
            }

            unload().then(() => {
                const canvas = document.querySelector("canvas");
                if (canvas) {
                    canvas.remove();
                    console.log("Canvas eliminado correctamente");
                }
            });
        };
    }, [isLoaded]);

    return (
        <div className="centered-container">
            <div className="centered-content">
                <h1 className="centered-title">Game 2</h1>

                <div className="unity-wrapper">
                    <Unity unityProvider={unityProvider} className="responsive-unity" />
                </div>

                <div className="centered-content">
                    <button onClick={handleSceneRestart}>Restart Scene</button>
                </div>
            </div>

            <div>
                <h1>Game 2</h1>
                <p>This is the second game.</p>
            </div>
        </div>
    );
}

export default Game2;
