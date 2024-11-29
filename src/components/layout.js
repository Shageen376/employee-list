import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("PRODUCT_VAULT_TKN");
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom box-shadow">
            <div className="container">
                <div className="navbar-brand d-flex align-items-center">
                    <img src="/officeLogo.jpg" alt="..." width="30" className="me-2" />
                    <span>Office</span>
                </div>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link text-dark" aria-current="page" to="/home">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-dark" to="/employee-list">
                                Employee List
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button
                                className="btn btn-outline-dark"
                                onClick={handleLogout}
                                style={{ cursor: "pointer" }}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export function Footer() {
    return (
        <div className="text-center p-4 border-top">
            <img src="/officeLogo.jpg" alt="..." width="30" className="me-2" />
            Office
        </div>
    );
}
