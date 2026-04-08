import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { LANGS } from "../../data/constants.js";
import "./HamburgerMenu.css";

const HamburgerMenu = ({
  isLoggedIn,
  showMenu,
  setShowMenu,
  logout,
  currentUser,
  changeLanguage,
}) => {
  const menuRef = useRef(null);

  const { t, i18n } = useTranslation();

  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    if (!showMenu) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target))
        setShowMenu(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu, setShowMenu]);

  return (
    <div
      ref={menuRef}
      className={`hamburger-menu${showMenu ? " hamburger-menu--open" : ""}`}
      aria-hidden={!showMenu}
    >
      <div className="hamburger-menu__panel">
        <header className="hamburger-menu__header">
          <button
            type="button"
            onClick={closeMenu}
            className="hamburger-menu__close"
            aria-label="Close menu"
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </header>

        <nav className="hamburger-menu__nav">
          <ul className="hamburger-menu__list">
            <li className="hamburger-menu__item">
              <NavLink
                className={({ isActive }) =>
                  `hamburger-menu__link${isActive ? " hamburger-menu__link--active" : ""}`
                }
                to="/"
                end
                onClick={closeMenu}
              >
                {t("navbar.home")}
              </NavLink>
            </li>
            <li className="hamburger-menu__item">
              <NavLink
                className={({ isActive }) =>
                  `hamburger-menu__link${isActive ? " hamburger-menu__link--active" : ""}`
                }
                to="/search-profile"
                onClick={closeMenu}
              >
                {t("navbar.searchProfile")}
              </NavLink>
            </li>
            <li className="hamburger-menu__item">
              <NavLink
                className={({ isActive }) =>
                  `hamburger-menu__link${isActive ? " hamburger-menu__link--active" : ""}`
                }
                to="/about"
                onClick={closeMenu}
              >
                {t("navbar.about")}
              </NavLink>
            </li>
            <li className="hamburger-menu__item">
              <NavLink
                className={({ isActive }) =>
                  `hamburger-menu__link${isActive ? " hamburger-menu__link--active" : ""}`
                }
                to="/contact"
                onClick={closeMenu}
              >
                {t("navbar.contact")}
              </NavLink>
            </li>
            <li className="hamburger-menu__item">
              <select
                value={i18n.resolvedLanguage || "en"}
                onChange={changeLanguage}
                className="hamburger-menu__control hamburger-menu__control--lang"
                aria-label="Change Language"
              >
                {LANGS.map((lng) => (
                  <option key={lng.code} value={lng.code}>
                    {lng.name}
                  </option>
                ))}
              </select>
            </li>

            <li
              className="hamburger-menu__divider"
              role="presentation"
              aria-hidden="true"
            />

            {isLoggedIn ? (
              <>
                <li className="hamburger-menu__item">
                  <Link
                    className="hamburger-menu__link hamburger-menu__link--accent"
                    to="/create-post"
                    onClick={closeMenu}
                  >
                    {t("navbar.createPost")}
                  </Link>
                </li>
                <li className="hamburger-menu__item">
                  <Link
                    className="hamburger-menu__link"
                    to="/notifications"
                    onClick={closeMenu}
                  >
                    {t("navbar.notifications")}
                  </Link>
                </li>
                <li className="hamburger-menu__item">
                  <Link
                    className="hamburger-menu__link"
                    to={`/profile/${currentUser?.id}`}
                    onClick={closeMenu}
                  >
                    {t("navbar.profile")}
                  </Link>
                </li>
                <li className="hamburger-menu__item">
                  <Link
                    className="hamburger-menu__link"
                    to="/saved-posts"
                    onClick={closeMenu}
                  >
                    {t("navbar.savedPosts")}
                  </Link>
                </li>
                <li className="hamburger-menu__item">
                  <button
                    type="button"
                    onClick={logout}
                    className="hamburger-menu__control hamburger-menu__control--logout"
                  >
                    {t("navbar.logout")}
                  </button>
                </li>
              </>
            ) : (
              <li className="hamburger-menu__item">
                <Link
                  className="hamburger-menu__link hamburger-menu__link--accent"
                  to="/login"
                  onClick={closeMenu}
                >
                  {t("navbar.login")}
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HamburgerMenu;
