import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { Helmet } from "react-helmet-async";
import ContactForm from "../../components/forms/ContactForm/ContactForm.jsx";
import "./ContactPage.css";

const ContactPage = ({ currentUser, baseUrl }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const pageTitle = t("contact.title");
  const pageUrl = `${baseUrl}/${location.pathname}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:url" content={pageUrl} />
      </Helmet>
      <div className="contact-container">
        <header className="contact-header">
          <h1 className="contact-title">{t("contact.title")}</h1>
        </header>

        <ContactForm currentUser={currentUser} />
      </div>
    </>
  );
};

export default ContactPage;
