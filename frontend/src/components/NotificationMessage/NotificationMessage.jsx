import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import "./NotificationMessage.css";

const NotificationMessage = ({ messageType, text }) => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={`notification-message ${messageType} ${isVisible && "visible"}`}
    >
      <div className="icon-container">
        <FontAwesomeIcon icon={faCheck} />
      </div>

      <p className="messageText">{text}</p>

      <button onClick={toggleVisibility} className="close-notification-btn">
        <FontAwesomeIcon icon={faX} />
      </button>
    </div>
  );
};

export default NotificationMessage;
