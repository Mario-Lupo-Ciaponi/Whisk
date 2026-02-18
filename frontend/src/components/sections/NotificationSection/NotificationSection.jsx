import NotificationCard from "../../cards/NotificationCard/NotificationCard.jsx";
import "./NotificationSection.css";

const NotificationSection = ({ notifications }) => {
  return (
    <section className="notification-section">
      {notifications.map((notification) => {
        return <NotificationCard notification={notification} />;
      })}
    </section>
  );
};

export default NotificationSection;
