import { NavLink } from "react-router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons'
import LogoImage from "../assets/logo.png"
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <img className="logo" src={LogoImage} alt="logo"/>
            
            <ul className="links">
                <li className="item"><NavLink to="/" className="link">Home</NavLink></li>
                <li className="item"><NavLink to="/search" className="link">Search</NavLink></li>
                <li className="item"><NavLink to="/groups" className="link">Groups</NavLink></li>
                <li className="item"><NavLink to="/create-post" className="link">Create Post</NavLink></li>
                <li className="item"><NavLink to="/help" className="link">Help</NavLink></li>
            </ul>

            <div className="profile-links">
                <FontAwesomeIcon icon={faBell} />
                <FontAwesomeIcon icon={faUser} />
            </div>
        </nav>
    )
}

export default Navbar;
