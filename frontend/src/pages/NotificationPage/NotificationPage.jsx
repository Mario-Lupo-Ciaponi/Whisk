import useNotifications from "../../hooks/useNotifications.js";
import NotificationSection from "../../components/sections/NotificationSection/NotificationSection.jsx";
import "./NotificationPage.css";

const NotificationPage = () => {
  const { notifications } = useNotifications();

  return (
    <div className="notification-page">
      <header className="notification-header">
        <h1 className="notification-title">
          Your notifications
        </h1>
      </header>

      <NotificationSection notifications={notifications} />
    </div>
  )
}

export default NotificationPage;
