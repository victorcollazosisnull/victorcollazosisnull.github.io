import './App.css'
import { Unity, useUnityContext } from "react-unity-webgl";

function App() {
    const { unityProvider } = useUnityContext({
        loaderUrl: "/UnityReact.loader.js",
        dataUrl: "/UnityReact.data.unityweb",
        frameworkUrl: "/UnityReact.framework.js.unityweb",
        codeUrl: "/UnityReact.wasm.unityweb",
    });

    return (
        <div className="centered-container">
            <div className="centered-content">
                <h1 className="centered-title">React + Unity / Tecsup</h1>
                    <Unity unityProvider={unityProvider} className="centered-unity" />
            </div>
        </div>
    );
}


export default App
