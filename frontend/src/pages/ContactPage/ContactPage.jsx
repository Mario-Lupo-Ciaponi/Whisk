import { useTranslation } from "react-i18next";
import ContactForm from "../../components/forms/ContactForm/ContactForm.jsx";
import "./ContactPage.css";

const ContactPage = ({ currentUser }) => {
  const { t } = useTranslation();

  return (
    <div className="contact-container">
      <title>{t("contact.title")}</title>

      <header className="contact-header">
        <h1 className="contact-title">{t("contact.title")}</h1>
      </header>

      <ContactForm currentUser={currentUser} />
    </div>
  );
};

export default ContactPage;
