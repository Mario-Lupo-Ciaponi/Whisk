import "./NotificationCard.css";

const NotificationCard = ({ notification }) => {
  return (
    <article className="notification-card">
      <p>{notification.text}</p>
    </article>
  )
}

export default NotificationCard;
