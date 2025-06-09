import { Link } from "react-router-dom";

function MainNav() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top bg-dark navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">CloudGames</Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Menu</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/consultas">Consultas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/game">Game 1</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/game2">Game 2</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/game3">Game 3</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/game4">Game 4</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/game5">Game 5</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/game6">Game 6</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MainNav;