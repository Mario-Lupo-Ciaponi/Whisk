import { NavLink, Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../api/api.js";
import { faUser, faBell } from "@fortawesome/free-solid-svg-icons";
import LogoImage from "../../assets/logo.png";
import "./Navbar.css";

const Navbar = ({ navigate, currentUser }) => {
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
          <NavLink to="/search" className="link">
            Search
          </NavLink>
        </li>
        <li className="item">
          <NavLink to="/groups" className="link">
            Groups
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
          <button className="notifications">
            <FontAwesomeIcon icon={faBell} />
          </button>

          <div className="dropdown user-options">
            <button className="user-toggle">
              <img
                className="profile-image"
                src={
                  currentUser?.profile.profile_image
                    ? currentUser.profile.profile_image
                    : "images/default-profile-img.jpeg"
                }
                alt="profile-image"
              />
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
                <Link to="#" className="dropdown-link">
                  Test
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
    </nav>
  );
};

export default Navbar;
