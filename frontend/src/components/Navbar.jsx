import { NavLink, Link } from "react-router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import api from "../api/api.js";
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons'
import LogoImage from "../assets/logo.png"
import "./Navbar.css";

function Navbar({ navigate }) {
    async function logout() {
        try {
            await api.post("token/blacklist/", {
                refresh: localStorage.getItem("refresh")
            });
        } catch {}

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        navigate("/");
    }

    const isLoggedIn = localStorage.getItem("access") !== null;

    return (
        <nav className="navbar">
            <img className="logo" src={LogoImage} alt="logo"/>
            
            <ul className="links">
                <li className="item"><NavLink to="/" end className="link">Home</NavLink></li>
                <li className="item"><NavLink to="/search" className="link">Search</NavLink></li>
                <li className="item"><NavLink to="/groups" className="link">Groups</NavLink></li>
                <li className="item"><NavLink to="/create-post" className="link">Create Post</NavLink></li>
                <li className="item"><NavLink to="/help" className="link">Help</NavLink></li>
            </ul>

            {isLoggedIn ?
                <div className="user-menu">
                    {/*<FontAwesomeIcon icon={faBell} />*/}
                    <div className="dropdown user-options">
                        <button className="user-toggle"><FontAwesomeIcon icon={faUser}/></button>

                        <ul className="menu-list">
                            <li className="dropdown-item">
                                <Link to="#" className="dropdown-link">Profile</Link>
                            </li>
                            <li className="dropdown-item">
                                <Link to="#" className="dropdown-link">Test</Link>
                            </li>
                            <li className="dropdown-item">
                                <button onClick={logout} className="logout-btn">Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
                :
                <Link to="login/" className="login-btn auth-link">Login</Link>
            }
        </nav>
    )
}

export default Navbar;
