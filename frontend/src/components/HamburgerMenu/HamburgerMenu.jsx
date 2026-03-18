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
    <div ref={menuRef} className={`hamburger-menu ${showMenu ? "active" : ""}`}>
      <button
        onClick={closeMenu}
        className="close-menu-btn"
        aria-label="Close menu"
      >
        <FontAwesomeIcon icon={faX} />
      </button>

      <ul className="hamburger-links">
        <li className="item">
          <Link className="link" to="/">
            {t("navbar.home")}
          </Link>
        </li>
        <li className="item">
          <Link className="link" to="/search-profile">
            {t("navbar.searchProfile")}
          </Link>
        </li>
        <li className="item">
          <Link className="link" to="/about">
            {t("navbar.about")}
          </Link>
        </li>
        <li className="item">
          <Link className="link" to="/contact">
            {t("navbar.contact")}
          </Link>
        </li>
        <li className="item">
          <button onClick={changeLanguage} className="language-switch-btn">
            {i18n.resolvedLanguage === "en" ? "English" : "Български"}
          </button>
        </li>

        {isLoggedIn ? (
          <>
            <li className="item">
              <Link className="link" to="/create-post">
                {t("navbar.createPost")}
              </Link>
            </li>
            <li className="item">
              <Link className="link" to="/notifications">
                {t("navbar.notifications")}
              </Link>
            </li>
            <li className="item">
              <Link className="link" to={`/profile/${currentUser?.id}`}>
                {t("navbar.profile")}
              </Link>
            </li>
            <li className="item">
              <Link className="link" to="/saved-posts">
                {t("navbar.savedPosts")}
              </Link>
            </li>
            <li className="item">
              <button onClick={logout} className="logout">
                {t("navbar.logout")}
              </button>
            </li>
          </>
        ) : (
          <li className="item">
            <Link className="link" to="/login">
              {t("navbar.login")}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default HamburgerMenu;
