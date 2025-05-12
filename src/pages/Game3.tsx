import { Unity, useUnityContext } from "react-unity-webgl";

function Game3() {
    const { unityProvider } = useUnityContext({
        loaderUrl: "/Game3/Game3.loader.js",
        dataUrl: "/Game3/Game3.data",
        frameworkUrl: "/Game3/Game3.framework.js",
        codeUrl: "/Game3/Game3.wasm",
    });

    return (
        <div className="centered-container">
            <div className="centered-content">
                <h1 className="centered-title">Game 3</h1>

                {/* AQUÍ debes poner el nuevo Unity con tamaño fijo */}
                <Unity
                    unityProvider={unityProvider}
                    style={{ width: "394px", height: "434px" }}
                />

            </div>
        </div>
    );
}
export default Game3;