import { Link } from "react-router";
import Logo from "../../assets/logo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="wrapper">
        <img className="logo" src={Logo} alt="logo" />

        <ul className="links">
          <li className="item">
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li className="item">
            <Link to="/search-profile" className="link">
              Search Profile
            </Link>
          </li>
          <li className="item">
            <Link to="/about" className="link">
              About
            </Link>
          </li>
          <li className="item">
            <Link to="/create-post" className="link">
              Create Post
            </Link>
          </li>
          <li className="item">
            <Link to="/contact" className="link">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <p className="rights-reserved">
        &copy; 2025-2026 Mario Lupo Fausto Ciaponi. All rights reserved{" "}
      </p>
    </footer>
  );
};

export default Footer;
