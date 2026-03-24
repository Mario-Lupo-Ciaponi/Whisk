import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/logo.png";
import "./Footer.css";

const Footer = ({ currentUser }) => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <img className="footer__logo" src={Logo} alt="logo" />
          <span className="footer__brand-name">Whisk</span>
        </div>

        <ul className="footer__links">
          <li className="footer__link-item">
            <Link to="/" className="footer__link">
              {t("footer.home", "Home")}
            </Link>
          </li>
          <li className="footer__link-item">
            <Link to="/search-profile" className="footer__link">
              {t("footer.searchProfile", "Search")}
            </Link>
          </li>
          <li className="footer__link-item">
            <Link to="/about" className="footer__link">
              {t("footer.about", "About")}
            </Link>
          </li>
          <li className="footer__link-item">
            <Link to="/create-post" className="footer__link">
              {t("footer.createPost", "Create Post")}
            </Link>
          </li>
          <li className="footer__link-item">
            <Link to="/contact" className="footer__link">
              {t("footer.contact", "Contact")}
            </Link>
          </li>
        </ul>
      </div>

      <div className="footer__divider"></div>

      <p className="footer__copyright">
        {t("footer.rightsReserved", "© 2026 All Rights Reserved")}
      </p>
    </footer>
  );
};

export default Footer;
