import { useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "../../Loader.jsx";
import toast from "react-hot-toast";
import api from "../../../api/api.js";
import "./ContactForm.css";

const ContactForm = ({ currentUser }) => {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState(currentUser?.email);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const sendEmail = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsLoading(true);

    if (!subject || !email || !message) {
      toast.error(message || t("contact.contactForm.allFieldsRequired"));
      return;
    }

    try {
      const data = {
        subject,
        email,
        message,
      };

      await api.post("contact/", data);

      setSubject("");
      setEmail(currentUser?.email);
      setMessage("");

      toast.success(t("contact.contactForm.emailSent"));
    } catch (e) {
      const errorData = e.response?.data;

      if (e.response?.status === 400) {
        const errorValue = Object.values(errorData)[0];

        const message = Array.isArray(errorValue) ? errorValue[0] : errorValue;

        toast.error(message || t("contact.contactForm.invalidData"));
      } else {
        toast.error(t("errors.somethingWentWrong"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={sendEmail} className="contact-form">
      <div className="two-field-container">
        <input
          value={subject}
          placeholder={t("contact.contactForm.subject")}
          className="form-field subject"
          type="text"
          onChange={(event) => {
            setSubject(event.target.value);
          }}
        />
        <input
          value={email}
          placeholder={t("contact.contactForm.email")}
          className="form-field email"
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>

      <textarea
        value={message}
        placeholder={t("contact.contactForm.message")}
        className="form-field message"
        rows="10"
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      ></textarea>

      <button className="send-btn">
        {isLoading ? <Loader width={20} height={20} /> : t("contact.contactForm.send")}
      </button>
    </form>
  );
};

export default ContactForm;
