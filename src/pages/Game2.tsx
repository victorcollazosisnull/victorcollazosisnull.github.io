import { Unity, useUnityContext } from "react-unity-webgl";
import { useEffect } from "react";

function Game2() {
    const { unityProvider, sendMessage, unload } = useUnityContext({
        loaderUrl: "/Game2/CardGame.loader.js",
        dataUrl: "/Game2/CardGame.data",
        frameworkUrl: "/Game2/CardGame.framework.js",
        codeUrl: "/Game2/CardGame.wasm",
    });

    let name: string = "VJCR";

    function handleSceneRestart() {
        sendMessage("SceneManager", "ReloadScene");
    }

    function sendName() {
        sendMessage("SceneManager", "ChangeText", name);
    }

    useEffect(() => {
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
                <Unity unityProvider={unityProvider} className="centered-unity" />
                <div className="centered-content">
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