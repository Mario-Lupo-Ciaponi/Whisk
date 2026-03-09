import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/logo.png";
import "./Footer.css";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="wrapper">
        <img className="logo" src={Logo} alt="logo" />

        <ul className="links">
          <li className="item">
            <Link to="/" className="link">
              {t("footer.home")}
            </Link>
          </li>
          <li className="item">
            <Link to="/search-profile" className="link">
              {t("footer.searchProfile")}
            </Link>
          </li>
          <li className="item">
            <Link to="/about" className="link">
              {t("footer.about")}
            </Link>
          </li>
          <li className="item">
            <Link to="/create-post" className="link">
              {t("footer.createPost")}
            </Link>
          </li>
          <li className="item">
            <Link to="/contact" className="link">
              {t("footer.contact")}
            </Link>
          </li>
        </ul>
      </div>

      <p className="rights-reserved">{t("footer.rightsReserved")}</p>
    </footer>
  );
};

export default Footer;
