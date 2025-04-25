import { Link } from "react-router-dom";

function MainNav() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top bg-dark navbar-dark">
            <div className="container">
                <a className="navbar-brand" href="/">CloudGames</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Menu</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/game">Prototype</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/game2">Prototype2</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default MainNav;