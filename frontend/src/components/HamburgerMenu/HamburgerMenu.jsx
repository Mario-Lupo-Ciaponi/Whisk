import { Link } from "react-router";
import "./HamburgerMenu.css";

const HamburgerMenu = ({ isLoggedIn, showMenu }) => {
  return (
    <ul className={`hamburger-menu ${showMenu ? "active" : ""}`}>
      <li className="item">
        <Link className="link" to="/">
          Home
        </Link>
      </li>
      <li className="item">
        <Link className="link" to="/search-profile">
          Search profile
        </Link>
      </li>
      <li className="item">
        <Link className="link" to="/about">
          About
        </Link>
      </li>
      <li className="item">
        <Link className="link" to="/contact">
          Contact
        </Link>
      </li>
      {isLoggedIn && (
        <>
          <li className="item">
            <Link className="link" to="/create-post">
              Create Post
            </Link>
          </li>
          <li className="item">
            <Link className="link" to="/notifications">
              Notifications
            </Link>
          </li>
          <li className="item">
            <Link className="link" to="/search-profile">
              Profile
            </Link>
          </li>
          <li className="item">
            <Link className="link" to="/about">
              Saved posts
            </Link>
          </li>
          <li className="item">
            <Link className="link" to="/contact">
              Logout
            </Link>
          </li>
        </>
      )}
      `
    </ul>
  );
};

export default HamburgerMenu;
