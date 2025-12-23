import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons'
import LogoImage from "../assets/logo.png"
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <img className="logo" src={LogoImage} alt="logo"/>
            
            <ul className="links">
                <li className="item"><a href="#" className="link">Home</a></li>
                <li className="item"><a href="#" className="link">Search</a></li>
                <li className="item"><a href="#" className="link">Groups</a></li>
                <li className="item"><a href="#" className="link">Create Post</a></li>
                <li className="item"><a href="#" className="link">Help</a></li>
            </ul>

            <div className="profile-links">
                <FontAwesomeIcon icon={faBell} />
                <FontAwesomeIcon icon={faUser} />
            </div>
        </nav>
    )
}

export default Navbar;
