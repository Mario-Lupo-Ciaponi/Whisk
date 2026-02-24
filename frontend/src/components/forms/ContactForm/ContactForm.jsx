import { useState } from "react";
import Loader from "../../Loader.jsx";
import toast from "react-hot-toast";
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
      };

      await api.post("contact/", data);

      setSubject("");
      setEmail(currentUser?.email);
      setMessage("");

      toast.success("Email sent successfully!");
    } catch (e) {
      const errorData = e.response?.data;

      if (e.response?.status === 400) {
        const firstError = Object.values(errorData)[0][0];
        toast.error(firstError);
      } else {
        toast.error("Something went wrong. Please try again later!");
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
        placeholder="Message"
        className="form-field message"
        rows="10"
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      ></textarea>

      <button className="send-btn">
        {isLoading ? <Loader width={20} height={20} /> : "Send"}
      </button>
    </form>
  );
};

export default ContactForm;
