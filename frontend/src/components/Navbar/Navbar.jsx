import {useEffect, useState} from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import useNotifications from "../../hooks/useNotifications.js";
import { NavLink, Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu.jsx";
import Loader from "../Loader.jsx";
import api from "../../api/api.js";
import { faBell, faBars } from "@fortawesome/free-solid-svg-icons";
import LogoImage from "../../assets/logo.png";
import "./Navbar.css";

const Navbar = ({ navigate, currentUser }) => {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {t, i18n} = useTranslation();
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
      toast.error(t("errors.somethingWentWrong"));
    } finally {
      setIsLoading(false);
    }
  };

  const changeLanguage = () => {
    if (i18n.language === "en") i18n.changeLanguage("bg");
    else i18n.changeLanguage("en");
  }

  const isLoggedIn = localStorage.getItem("access") !== null;

  const toggleShowHamburgerMenu = () => setShowHamburgerMenu(true);

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img className="logo" src={LogoImage} alt="logo" />
      </div>

      <ul className="links">
        <li className="item">
          <NavLink to="/" end className="link">
            {t("navbar.home")}
          </NavLink>
        </li>
        <li className="item">
          <NavLink to="/search-profile" className="link">
            {t("navbar.searchProfile")}
          </NavLink>
        </li>
        <li className="item">
          <NavLink to="/about" className="link">
            {t("navbar.about")}
          </NavLink>
        </li>
        <li className="item">
          <NavLink to="/contact" className="link">
            {t("navbar.contact")}
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
                  {t("navbar.profile")}
                </Link>
              </li>
              <li className="dropdown-item">
                <Link to="/saved-posts" className="dropdown-link">
                  {t("navbar.savedPosts")}
                </Link>
              </li>
              <li className="dropdown-item">
                <button onClick={logout} className="logout-btn">
                  {isLoading ? <Loader width={15} height={15} /> : t("navbar.logout")}
                </button>
              </li>
              <li className="dropdown-item">
                <button onClick={changeLanguage} className="language-switch-btn">
                  {i18n.resolvedLanguage === "en" ? "English" : "Български"}
                </button>
              </li>
            </ul>
          </div>

          <Link className="create-post-link" to="create-post/">
            {t("navbar.createPost")}
          </Link>
        </div>
      ) : (
        <div className="auth-link-container">
          <Link to="/login" className="login-btn auth-link">
            {t("navbar.login")}
          </Link>

          {!showHamburgerMenu &&
            <button onClick={changeLanguage} className="language-switch-btn">
              {i18n.resolvedLanguage === "en" ? "English" : "Български"}
            </button>
          }

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
        changeLanguage={changeLanguage}
      />
    </nav>
  );
};

export default Navbar;
