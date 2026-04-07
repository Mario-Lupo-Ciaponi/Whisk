import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import Loader from "../../Loader.jsx";
import api from "../../../api/api.js";
import "./NotificationCard.css";

const NotificationCard = ({ notification, setNotifications }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const deleteNotification = async () => {
    setIsLoading(true);
    try {
      await api.delete(`notifications/${notification.id}/delete/`);

      setNotifications(prev => prev.filter(n => n !== notification));

      toast.success(t("notificationCard.deletedSuccessfully"));
    } catch {
      toast.error(t("errors.somethingWentWrong"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="notification-card">
      <p className="notification-card__content">
        {notification.sender ? (
          <Link
            className="notification-card__link"
            to={`/profile/${notification.sender.id}`}
          >
            {notification.sender.username}
          </Link>
        ) : (
          "Anonymous user"
        )}{" "}
        {notification.text}{" "}
        <Link
          className="notification-card__link"
          to={`/post/${notification.post_id}`}
        >
          Post
        </Link>
      </p>
      <button
        onClick={deleteNotification}
        className="notification-card__delete-btn"
      >
        {isLoading ? (
          <Loader width={15} height={15} />
        ) : (
          <FontAwesomeIcon icon={faX} />
        )}
      </button>
    </article>
  );
};

export default NotificationCard;
