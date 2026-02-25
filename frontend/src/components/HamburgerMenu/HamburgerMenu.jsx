import { Link } from "react-router";
import "./HamburgerMenu.css";

const HamburgerMenu = ({ isLoggedIn, showMenu, logout, currentUser }) => {
  return (
    <ul className={`hamburger-menu ${showMenu ? "active" : ""}`}>
      <li className="item">
        <Link className="link" to="/">
          Home
        </Link>
      </li>
      <li className="item">
        <Link className="link" to="/search-profile">
          Search Profile
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

      {isLoggedIn ? (
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
            <Link className="link" to={`/profile/${currentUser?.id}`}>
              Profile
            </Link>
          </li>
          <li className="item">
            <Link className="link" to="/saved-posts">
              Saved Posts
            </Link>
          </li>
          <li className="item">
            <button onClick={logout} className="logout">
              Logout
            </button>
          </li>
        </>
      ) : (
        <li className="item">
          <Link className="link" to="/login">
            Login
          </Link>
        </li>
      )}
    </ul>
  );
};

export default HamburgerMenu;
