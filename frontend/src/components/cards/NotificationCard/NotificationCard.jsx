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

      setNotifications((prev) => prev.filter((n) => n !== notification));

      toast.success(t("notificationCard.deletedSuccessfully"));
    } catch {
      toast.error(t("errors.somethingWentWrong"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="notification-card">
      <Link
        className="notification-card__profile-link"
        to={`/profile/${notification.sender?.id}`}
      >
        <img
          src={
            notification.sender?.profile?.profile_image
              ? notification.sender.profile.profile_image
              : "/images/default-profile-img.jpeg"
          }
          alt="profile-image"
          className="notification-card__profile-image"
        />
      </Link>

      <div className="notification-card__content-wrapper">
        <p className="notification-card__content">
          {notification.sender ? (
            <Link
              className="notification-card__link notification-card__sender-name"
              to={`/profile/${notification.sender.id}`}
            >
              {notification.sender.username}
            </Link>
          ) : (
            <span className="notification-card__sender-name">
              Anonymous user
            </span>
          )}{" "}
          <span className="notification-card__text">{notification.text}</span>{" "}
          <Link
            className="notification-card__link notification-card__post-link"
            to={`/post/${notification.post_id}`}
          >
            Post
          </Link>
        </p>
      </div>

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
