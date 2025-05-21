import { Unity, useUnityContext } from "react-unity-webgl";
import { useEffect, useState } from "react";

function Game2() {
    const { unityProvider, sendMessage, unload } = useUnityContext({
        loaderUrl: "/Game2/Game2.loader.js",
        dataUrl: "/Game2/Game2.data",
        frameworkUrl: "/Game2/Game2.framework.js",
        codeUrl: "/Game2/Game2.wasm",
    });

    const [name, setName] = useState<string>("");

    function handleSceneRestart() {
        sendMessage("SceneManager", "ReloadScene");
    }

    function sendName() {
        sendMessage("SceneManager", "ChangeText", name);
    }

    useEffect(() => {
        const canvas = document.querySelector("canvas");
        if (canvas) {
            canvas.setAttribute("tabindex", "-1");
            canvas.blur(); // Quita el foco del canvas
        }

        return () => {
            console.log("Desmontando Game2, descargando Unity...");
            unload().then(() => {
                const canvas = document.querySelector("canvas");
                if (canvas) {
                    canvas.remove();
                    console.log("Canvas eliminado correctamente");
                }
            });
        };
    }, []);

    return (
        <div className="centered-container">
            <div className="centered-content">
                <h1 className="centered-title">Game 2</h1>

                <div className="unity-wrapper">
                    <Unity unityProvider={unityProvider} className="responsive-unity" />
                </div>

                <div className="centered-content">
                    <input
                        className="name-input"
                        type="text"
                        placeholder="Write your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                    <button onClick={handleSceneRestart}>Restart Scene</button>
                    <button onClick={sendName}>Send Name</button>
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