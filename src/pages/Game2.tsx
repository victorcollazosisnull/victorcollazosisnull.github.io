import { Unity, useUnityContext } from "react-unity-webgl";


function Game2() {
    const { unityProvider, sendMessage } = useUnityContext({
        loaderUrl: "/Game2/cloud.loader.js",
        dataUrl: "/Game2/cloud.data",
        frameworkUrl: "/Game2/cloud.framework.js",
        codeUrl: "/Game2/cloud.wasm",
    });

    let name: string = "VJCR"


    function handleSceneRestart() {
        sendMessage("SceneManager", "ReloadScene");
    }

    function sendName()
    {
        sendMessage("SceneManager", "ChangeText", name);
    }

    return (
        <>
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
        </>
    );
}

export default Game2;