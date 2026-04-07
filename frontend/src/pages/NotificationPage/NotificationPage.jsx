import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import useNotifications from "../../hooks/useNotifications.js";
import { Helmet } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import NotificationSection from "../../components/sections/NotificationSection/NotificationSection.jsx";
import Loader from "../../components/Loader.jsx";
import NoResult from "../../components/NoResult/NoResult.jsx";
import "./NotificationPage.css";

const NotificationPage = ({ baseUrl }) => {
  const { t } = useTranslation();
  const { notifications, setNotifications, isLoading } = useNotifications();

  const location = useLocation();

  const pageTitle = t("notificationPage.title");
  const pageUrl = `${baseUrl}${location.pathname}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:url" content={pageUrl} />
      </Helmet>
      <div className="notification-page">
          <Toaster position={"top-center"} />
        <header className="notification-header">
          <h1 className="notification-title">
            {t("notificationPage.heading")}
          </h1>
        </header>
        {isLoading ? (
          <div className="loader-container">
            <Loader height={150} width={150} />
          </div>
        ) : notifications.length > 0 ? (
          <NotificationSection notifications={notifications} setNotifications={setNotifications} />
        ) : (
          <NoResult type="notifications" />
        )}
      </div>
    </>
  );
};

export default NotificationPage;
