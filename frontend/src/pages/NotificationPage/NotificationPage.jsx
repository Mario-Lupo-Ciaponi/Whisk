import useNotifications from "../../hooks/useNotifications.js";
import NotificationSection from "../../components/sections/NotificationSection/NotificationSection.jsx";
import NoResult from "../../components/NoResult/NoResult.jsx";
import "./NotificationPage.css";

const NotificationPage = () => {
  const { notifications } = useNotifications();

  return (
    <div className="notification-page">
      <title>Notification</title>

      <header className="notification-header">
        <h1 className="notification-title">Your notifications</h1>
      </header>

      {notifications.length > 1 ?
        <NotificationSection notifications={notifications} />
        :
        <NoResult type="notifications"/>
      }

    </div>
  );
};

export default NotificationPage;
