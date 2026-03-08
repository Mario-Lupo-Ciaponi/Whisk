import { useTranslation } from "react-i18next";
import useNotifications from "../../hooks/useNotifications.js";
import NotificationSection from "../../components/sections/NotificationSection/NotificationSection.jsx";
import Loader from "../../components/Loader.jsx";
import NoResult from "../../components/NoResult/NoResult.jsx";
import "./NotificationPage.css";

const NotificationPage = () => {
  const { t } = useTranslation();
  const { notifications , isLoading} = useNotifications();

  return (
    <div className="notification-page">
      <title>{t("notificationPage.title")}</title>

      <header className="notification-header">
        <h1 className="notification-title">{t("notificationPage.heading")}</h1>
      </header>
      {
        isLoading ?
          <div className="loader-container">
            <Loader height={150} width={150} />
          </div>
           :
          notifications.length > 0 ? (
            <NotificationSection notifications={notifications} />
          ) : (
            <NoResult type="notifications" />
          )
      }

    </div>
  );
};

export default NotificationPage;
