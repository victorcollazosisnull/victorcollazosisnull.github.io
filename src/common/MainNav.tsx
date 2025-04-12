import { Link } from "react-router-dom";

function MainNav() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top bg-dark navbar-dark">
            <div className="container">
                <a className="navbar-brand" href="/">CloudGames</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Menu</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/game">Prototype</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default MainNav;