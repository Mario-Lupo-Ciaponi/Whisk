import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";
import "./HamburgerMenu.css";

const HamburgerMenu = ({ isLoggedIn, showMenu, setShowMenu, logout, currentUser }) => {
  const menuRef = useRef(null);

  const closeMenu = () => setShowMenu(false);


  useEffect(() => {
    if (!showMenu) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setShowMenu(false);
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu, setShowMenu]);

  return (
    <div ref={menuRef} className={`hamburger-menu ${showMenu ? "active" : ""}`}>
      <button onClick={closeMenu} className="close-menu-btn">
        <FontAwesomeIcon icon={faX} />
      </button>

      <ul className="hamburger-links">
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
    </div>

  );
};

export default HamburgerMenu;
