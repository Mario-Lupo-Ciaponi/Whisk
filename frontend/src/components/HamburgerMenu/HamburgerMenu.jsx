import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "./HamburgerMenu.css";
import { useTranslation } from "react-i18next";

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
              <Link className="hamburger-menu__link" to="/" onClick={closeMenu}>
                {t("navbar.home")}
              </Link>
            </li>
            <li className="hamburger-menu__item">
              <Link
                className="hamburger-menu__link"
                to="/search-profile"
                onClick={closeMenu}
              >
                {t("navbar.searchProfile")}
              </Link>
            </li>
            <li className="hamburger-menu__item">
              <Link
                className="hamburger-menu__link"
                to="/about"
                onClick={closeMenu}
              >
                {t("navbar.about")}
              </Link>
            </li>
            <li className="hamburger-menu__item">
              <Link
                className="hamburger-menu__link"
                to="/contact"
                onClick={closeMenu}
              >
                {t("navbar.contact")}
              </Link>
            </li>
            <li className="hamburger-menu__item">
              <button
                type="button"
                onClick={changeLanguage}
                className="hamburger-menu__control hamburger-menu__control--lang"
              >
                {i18n.resolvedLanguage === "en" ? "English" : "Български"}
              </button>
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
