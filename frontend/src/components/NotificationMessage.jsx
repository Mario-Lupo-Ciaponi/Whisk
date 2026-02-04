import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./NotificationMessage.css";

const NotificationMessage = ({ messageType, text }) => {
  return (
    <div className={`notification-message ${messageType}`}>
      <div className="icon-container">
        <FontAwesomeIcon icon={faCheck} />
      </div>

      <p className="messageText">{text}</p>
    </div>
  );
};

export default NotificationMessage;
