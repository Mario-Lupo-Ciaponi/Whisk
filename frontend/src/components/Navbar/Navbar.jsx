import { useState } from "react";
import useNotifications from "../../hooks/useNotifications.js";
import { NavLink, Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu.jsx";
import api from "../../api/api.js";
import { faBell, faBars } from "@fortawesome/free-solid-svg-icons";
import LogoImage from "../../assets/logo.png";
import "./Navbar.css";
import Loader from "../Loader.jsx";

const Navbar = ({ navigate, currentUser }) => {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { notifications, notificationCount } = useNotifications();

  const logout = async () => {
    setIsLoading(true);

    try {
      await api.post("token/blacklist/", {
        refresh: localStorage.getItem("refresh"),
      });

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      navigate("/");
      location.reload();
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const isLoggedIn = localStorage.getItem("access") !== null;

  const toggleShowHamburgerMenu = () =>
    setShowHamburgerMenu(true);

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img className="logo" src={LogoImage} alt="logo" />
      </div>

      <ul className="links">
        <li className="item">
          <NavLink to="/" end className="link">
            Home
          </NavLink>
        </li>
        <li className="item">
          <NavLink to="/search-profile" className="link">
            Search Profile
          </NavLink>
        </li>
        <li className="item">
          <NavLink to="/about" className="link">
            About
          </NavLink>
        </li>
        <li className="item">
          <NavLink to="/contact" className="link">
            Contact
          </NavLink>
        </li>
      </ul>

      {isLoggedIn ? (
        <div className="user-menu">
          <Link to="/notifications" className="notifications">
            <FontAwesomeIcon icon={faBell} />
            {notificationCount && (
              <span className="notification-count">{notificationCount}</span>
            )}
          </Link>

          <div className="dropdown user-options">
            <button className="user-toggle">
              <div className="image-container">
                <img
                  className="profile-image"
                  src={
                    currentUser?.profile.profile_image
                      ? currentUser.profile.profile_image
                      : "images/default-profile-img.jpeg"
                  }
                  alt="profile-image"
                />
              </div>
              <span className="username">{currentUser?.username}</span>
            </button>

            <ul className="menu-list">
              <li className="dropdown-item">
                <Link
                  to={`profile/${currentUser?.id}`}
                  className="dropdown-link"
                >
                  Profile
                </Link>
              </li>
              <li className="dropdown-item">
                <Link to="/saved-posts" className="dropdown-link">
                  Saved Posts
                </Link>
              </li>
              <li className="dropdown-item">
                <button onClick={logout} className="logout-btn">
                  {isLoading ? <Loader width={15} height={15} /> : "Logout" }
                </button>
              </li>
            </ul>
          </div>

          <Link className="create-post-link" to="create-post/">
            Create Post
          </Link>
        </div>
      ) : (
        <div className="auth-link-container">
          <Link to="/login" className="login-btn auth-link">
            Login
          </Link>
        </div>
      )}

      <button onClick={toggleShowHamburgerMenu} className="menu-btn">
        <FontAwesomeIcon icon={faBars} />
      </button>

      <HamburgerMenu
        isLoggedIn={isLoggedIn}
        showMenu={showHamburgerMenu}
        setShowMenu={setShowHamburgerMenu}
        logout={logout}
        currentUser={currentUser}
      />
    </nav>
  );
};

export default Navbar;
