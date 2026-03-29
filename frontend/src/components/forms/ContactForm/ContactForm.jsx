import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faEnvelope,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
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
      <div className="contact-form__group">
        <label htmlFor="subject" className="contact-form__label">
          <FontAwesomeIcon className="contact-form__icon" icon={faFileLines} />{" "}
          {t("contact.contactForm.subject")}
        </label>
        <input
          id="subject"
          value={subject}
          placeholder={
            t("contact.contactForm.subjectPlaceholder") || "What is this about?"
          }
          className="contact-form__field"
          type="text"
          onChange={(event) => {
            setSubject(event.target.value);
          }}
        />
      </div>

      <div className="contact-form__group">
        <label htmlFor="email" className="contact-form__label">
          <FontAwesomeIcon className="contact-form__icon" icon={faEnvelope} />{" "}
          {t("contact.contactForm.email")}
        </label>
        <input
          id="email"
          value={email}
          placeholder={
            t("contact.contactForm.emailPlaceholder") ||
            "your.email@example.com"
          }
          className="contact-form__field"
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>

      <div className="contact-form__group">
        <label htmlFor="message" className="contact-form__label">
          <FontAwesomeIcon className="contact-form__icon" icon={faMessage} />{" "}
          {t("contact.contactForm.message")}
        </label>
        <textarea
          id="message"
          value={message}
          placeholder={
            t("contact.contactForm.messagePlaceholder") ||
            "Tell us more about your inquiry..."
          }
          className="contact-form__field contact-form__field--message"
          rows="10"
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        ></textarea>
      </div>

      {/* Temporarily disable submit button until backend is ready to receive contact form submissions */}
      <button disabled className="contact-form__submit-btn">
        {isLoading ? (
          <Loader width={20} height={20} />
        ) : (
          t("contact.contactForm.send")
        )}
      </button>
    </form>
  );
};

export default ContactForm;
