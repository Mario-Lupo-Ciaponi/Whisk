import { useState } from "react";
import "./ContactForm.css";

const ContactForm = ({ currentUser }) => {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState(currentUser?.email)
  const [message, setMessage] = useState("");

  return (
    <form className="contact-form">
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
      >
      </textarea>

      <button className="send-btn">Send</button>
    </form>
  )
}

export default ContactForm
