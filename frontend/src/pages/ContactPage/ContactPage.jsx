import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { Helmet } from "react-helmet-async";
import ContactForm from "../../components/forms/ContactForm/ContactForm.jsx";
import "./ContactPage.css";

const ContactPage = ({ currentUser, baseUrl }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const pageTitle = t("contact.title");
  const pageUrl = `${baseUrl}${location.pathname}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:url" content={pageUrl} />
      </Helmet>
      <div className="contact-page">
        <div className="contact-page__card">
          <header className="contact-page__header">
            <h1 className="contact-page__title">{t("contact.title")}</h1>
          </header>

          <ContactForm currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ContactPage;
