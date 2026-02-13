import { useState } from "react";
import Loader from "../../Loader.jsx";
import api from "../../../api/api.js";
import "./ContactForm.css";

const ContactForm = ({ currentUser }) => {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState(currentUser?.email);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsLoading(true);
    try {
      const data = {
        subject,
        email,
        message,
      }

      await api.post("contact/", data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={sendEmail} className="contact-form">
      <div className="two-field-container">
        <input
          value={subject}
          placeholder="Subject"
          className="form-field subject"
          type="text"
          onChange={(event) => {
            setSubject(event.target.value);
          }}
        />
        <input
          value={email}
          placeholder="Email adress"
          className="form-field email"
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>

      <textarea
        value={message}
        className="form-field message"
        rows="10"
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      ></textarea>

      <button className="send-btn">{isLoading ? <Loader width={20} height={20} /> : "Send"}</button>
    </form>
  );
};

export default ContactForm;
