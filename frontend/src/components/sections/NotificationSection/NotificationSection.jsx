import NotificationCard from "../../cards/NotificationCard/NotificationCard.jsx";
import "./NotificationSection.css";

const NotificationSection = ({ notifications, setNotifications }) => {
  return (
    <section className="notification-section">
      {notifications.map((notification) => {
        return <NotificationCard notification={notification} setNotifications={setNotifications} />;
      })}
    </section>
  );
};

export default NotificationSection;
