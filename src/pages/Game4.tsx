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

                <div className="unity-wrapper">
                    <Unity unityProvider={unityProvider} className="responsive-unity" />
                </div>
            </div>
        </div>
    );
}

export default Game4;