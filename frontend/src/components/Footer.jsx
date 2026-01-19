import { Link } from "react-router";
import Logo from "../assets/logo.png";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="wrapper">
                <img className="logo" src={Logo} alt="logo"/>

                <ul className="links">
                    <li className="item"><Link to="/" className="link">Home</Link></li>
                    <li className="item"><Link to="/search" className="link">Search</Link></li>
                    <li className="item"><Link to="/groups" className="link">Groups</Link></li>
                    <li className="item"><Link to="/create-post" className="link">Create Post</Link></li>
                    <li className="item"><Link to="/help" className="link">Help</Link></li>
                </ul>
            </div>

            <p className="rights-reserved">&copy; 2025 Mario Lupo Ciaponi. All rights reserved  </p>
        </footer>
    );
}

export default Footer;