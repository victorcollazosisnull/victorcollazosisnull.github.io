import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomeMenu() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (user) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Bienvenido, {user.email}</h2>
        <button onClick={() => navigate("/game3")}>Jugar</button>
        <button onClick={handleLogout} style={{ marginLeft: "1rem" }}>
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>¿Ya tienes cuenta?</h2>
      <button onClick={() => navigate("/login")}>Iniciar sesión</button>
      <h2>¿Eres nuevo?</h2>
      <button onClick={() => navigate("/register")}>Registrarse</button>
    </div>
  );
}

export default HomeMenu;