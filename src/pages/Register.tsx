import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  const res = await fetch("http://localhost/register.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (data.status === "created") {
    // ✅ Guardar sesión automáticamente
    localStorage.setItem("user", JSON.stringify({ email }));

    alert("Usuario registrado correctamente");
    navigate("/"); // Redirige al inicio
  } else if (data.status === "exists") {
    alert("El usuario ya existe");
  } else {
    alert("Error al registrar");
  }
};

  return (
    <form onSubmit={handleRegister} style={{ padding: "2rem" }}>
      <h2>Registro</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button type="submit">Registrarse</button>
    </form>
  );
}

export default Register;
