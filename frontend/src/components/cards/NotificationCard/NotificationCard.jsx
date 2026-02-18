import { Link } from "react-router";
import "./NotificationCard.css";
import {useEffect} from "react";

const NotificationCard = ({ notification }) => {
  useEffect(() => {
    console.log(notification)
  }, []);
  return (
    <article className="notification-card">
      <p>
        {
          notification.sender ? <Link className="link" to={`/profile/${notification.sender.id}`}>{notification.sender.username}</Link>
            :
            "Anonymous user"} {notification.text} <Link className="link" to={`/post/${notification.post_id}`}>Post</Link>
      </p>
    </article>
  );
};

export default NotificationCard;
