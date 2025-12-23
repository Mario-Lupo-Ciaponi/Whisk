import Logo from "../assets/logo.png";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="wrapper">
                <img className="logo" src={Logo} alt="logo"/>

                <ul className="links">
                    <li className="item"><a href="#" className="link">Home</a></li>
                    <li className="item"><a href="#" className="link">Search</a></li>
                    <li className="item"><a href="#" className="link">Groups</a></li>
                    <li className="item"><a href="#" className="link">Create Post</a></li>
                    <li className="item"><a href="#" className="link">Help</a></li>
                </ul>
            </div>

            <p className="rights-reserved">&copy; 2025 Mario Lupo Ciaponi. All rights reserved  </p>
        </footer>
    );
}

export default Footer;