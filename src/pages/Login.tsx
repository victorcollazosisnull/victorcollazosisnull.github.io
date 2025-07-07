import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Cambia esta URL si tu backend está en otro sitio
  const BACKEND_URL = "http://localhost/login.php";

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await res.json();

      if (data.status === "success") {
        localStorage.setItem("user", JSON.stringify({ email }));
        navigate("/");
      } else if (data.status === "invalid") {
        alert("Contraseña incorrecta");
      } else if (data.status === "not_found") {
        alert("Usuario no encontrado");
      } else {
        alert("Error desconocido");
      }
    } catch (error) {
      alert("No se pudo conectar con el servidor. Revisa la consola.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ padding: "2rem" }}>
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
      />
      <br />
      <br />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={loading}
      />
      <br />
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Ingresando..." : "Entrar"}
      </button>
    </form>
  );
}

export default Login;