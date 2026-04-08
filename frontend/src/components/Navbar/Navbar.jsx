import { useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import useNotifications from "../../hooks/useNotifications.js";
import { NavLink, Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu.jsx";
import Loader from "../Loader.jsx";
import api from "../../api/api.js";
import { LANGS } from "../../data/constants.js";
import { faBell, faBars } from "@fortawesome/free-solid-svg-icons";
import LogoImage from "../../assets/logo.png";
import "./Navbar.css";

const Navbar = ({ navigate, currentUser }) => {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const { notificationCount } = useNotifications();

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

  const changeLanguage = (e) => i18n.changeLanguage(e.target.value);

  const isLoggedIn = localStorage.getItem("access") !== null;

  const toggleShowHamburgerMenu = () => setShowHamburgerMenu(true);

  return (
    <nav className="navbar" aria-label="Primary">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand" aria-label={t("navbar.home")}>
          <img className="navbar__logo" src={LogoImage} alt="" />
        </Link>

        <ul className="navbar__links">
          <li className="navbar__item">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `navbar__link${isActive ? " navbar__link--active" : ""}`
              }
            >
              {t("navbar.home")}
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              to="/search-profile"
              className={({ isActive }) =>
                `navbar__link${isActive ? " navbar__link--active" : ""}`
              }
            >
              {t("navbar.searchProfile")}
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `navbar__link${isActive ? " navbar__link--active" : ""}`
              }
            >
              {t("navbar.about")}
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `navbar__link${isActive ? " navbar__link--active" : ""}`
              }
            >
              {t("navbar.contact")}
            </NavLink>
          </li>
        </ul>

        {isLoggedIn ? (
          <div className="navbar__account">
            <Link
              to="/notifications"
              className="navbar__notify"
              aria-label={t("navbar.notifications")}
            >
              <span className="navbar__notify-icon" aria-hidden="true">
                <FontAwesomeIcon icon={faBell} />
              </span>
              {notificationCount ? (
                <span className="navbar__badge">{notificationCount}</span>
              ) : null}
            </Link>

            <div className="navbar__dropdown">
              <button
                type="button"
                className="navbar__user-trigger"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="navbar__avatar-ring">
                  <img
                    className="navbar__avatar"
                    src={
                      currentUser?.profile.profile_image
                        ? currentUser.profile.profile_image
                        : "images/default-profile-img.jpeg"
                    }
                    alt=""
                  />
                </span>
                <span className="navbar__username">
                  {currentUser?.username}
                </span>
              </button>

              <ul className="navbar__menu" role="menu">
                <li className="navbar__menu-item" role="none">
                  <Link
                    to={`profile/${currentUser?.id}`}
                    className="navbar__menu-link"
                    role="menuitem"
                  >
                    {t("navbar.profile")}
                  </Link>
                </li>
                <li className="navbar__menu-item" role="none">
                  <Link
                    to="/saved-posts"
                    className="navbar__menu-link"
                    role="menuitem"
                  >
                    {t("navbar.savedPosts")}
                  </Link>
                </li>
                <li className="navbar__menu-item" role="none">
                  <button
                    type="button"
                    onClick={logout}
                    className="navbar__menu-button navbar__menu-button--logout"
                  >
                    {isLoading ? (
                      <Loader width={15} height={15} />
                    ) : (
                      t("navbar.logout")
                    )}
                  </button>
                </li>
                <li className="navbar__menu-item" role="none">
                  <select
                    value={i18n.resolvedLanguage || "en"}
                    onChange={changeLanguage}
                    className="navbar__menu-button navbar__menu-button--lang"
                    aria-label="Change Language"
                  >
                    {LANGS.map((lng) => (
                      <option key={lng.code} value={lng.code}>
                        {lng.name}
                      </option>
                    ))}
                  </select>
                </li>
              </ul>
            </div>

            <Link className="navbar__cta" to="create-post/">
              {t("navbar.createPost")}
            </Link>
          </div>
        ) : (
          <div className="navbar__guest">
            <Link to="/login" className="navbar__login">
              {t("navbar.login")}
            </Link>

            {!showHamburgerMenu && (
              <select
                value={i18n.resolvedLanguage || "en"}
                onChange={changeLanguage}
                className="navbar__lang"
                aria-label="Change Language"
              >
                {LANGS.map((lng) => (
                  <option key={lng.code} value={lng.code}>
                    {lng.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={toggleShowHamburgerMenu}
          className="navbar__menu-toggle"
          aria-label="Open menu"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

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
