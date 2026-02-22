import useNotifications from "../../hooks/useNotifications.js";
import { NavLink, Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../api/api.js";
import {faUser, faBell, faBars} from "@fortawesome/free-solid-svg-icons";
import LogoImage from "../../assets/logo.png";
import "./Navbar.css";

const Navbar = ({ navigate, currentUser }) => {
  const { notifications, notificationCount } = useNotifications();

  const logout = async () => {
    try {
      await api.post("token/blacklist/", {
        refresh: localStorage.getItem("refresh"),
      });
    } catch (e) {
      console.log(e);
    }

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/");
    location.reload();
  };

  const isLoggedIn = localStorage.getItem("access") !== null;

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
          <NavLink to="/help" className="link">
            Help
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
                  Logout
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

      <button className="menu-btn">
        <FontAwesomeIcon icon={faBars} />
      </button>
    </nav>
  );
};

export default Navbar;
