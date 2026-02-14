import ContactForm from "../../components/forms/ContactForm/ContactForm.jsx";
import NotificationMessage from "../../components/NotificationMessage/NotificationMessage.jsx";
import "./ContactPage.css";
import { useState } from "react";

const ContactPage = ({ currentUser }) => {
  const [notificationMessage, setNotificationMessage] = useState("");
  return (
    <div className="contact-container">
      <header className="contact-header">
        <h1 className="contact-title">Contact us</h1>
      </header>

      {notificationMessage && (
        <NotificationMessage messageType="success" text={notificationMessage} />
      )}

      <ContactForm
        currentUser={currentUser}
        setNotificationMessage={setNotificationMessage}
      />
    </div>
  );
};

export default ContactPage;
