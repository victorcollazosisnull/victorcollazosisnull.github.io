import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type User = {
  email: string;
};

function MainNav() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); // Redirigir al inicio
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">CloudGames</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">Menu</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/game1">Game 1</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/game2">Game 2</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/game3">Game 3</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/game4">Game 4</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/game5">Game 5</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/game6">Game 6</Link></li>
          </ul>

          {user ? (
            <div className="d-flex align-items-center">
              <span className="navbar-text text-white me-3">Bienvenido, {user.email}</span>
              <button className="btn btn-outline-light" onClick={handleLogout}>Cerrar sesión</button>
            </div>
          ) : (
            <div className="d-flex">
              <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
              <Link to="/register" className="btn btn-outline-light">Registro</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default MainNav;