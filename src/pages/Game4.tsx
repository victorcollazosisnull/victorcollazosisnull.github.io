import { Unity, useUnityContext } from "react-unity-webgl";
import { useEffect, useState } from "react";

function Game4() {
    const { unityProvider, sendMessage, unload } = useUnityContext({
        loaderUrl: "/Game4/Game4.loader.js",
        dataUrl: "/Game4/Game4.data",
        frameworkUrl: "/Game4/Game4.framework.js",
        codeUrl: "/Game4/Game4.wasm",
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
            canvas.blur(); // para que no capture el teclado
        }

        return () => {
            unload().then(() => {
                const canvas = document.querySelector("canvas");
                if (canvas) canvas.remove();
            });
        };
    }, []);

    return (
        <div className="centered-container">
            <div className="centered-content">
                <h1 className="centered-title">Game 4</h1>

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
                <p>This is the fourth game.</p>
            </div>
        </div>
    );
}

export default Game4;