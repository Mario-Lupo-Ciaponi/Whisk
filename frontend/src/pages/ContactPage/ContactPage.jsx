import ContactForm from "../../components/forms/ContactForm/ContactForm.jsx";
import "./ContactPage.css";

const ContactPage = ({ currentUser }) => {
  return (
    <div className="contact-container">
      <header className="contact-header">
        <h1 className="contact-title">Contact us</h1>
      </header>

      <ContactForm currentUser={currentUser} />
    </div>
  );
}

export default ContactPage;
