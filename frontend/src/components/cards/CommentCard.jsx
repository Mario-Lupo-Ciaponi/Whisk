import dayjs from "dayjs";
import "./CommentCard.css";

const CommentCard = ({ comment }) => {
  const formatedDate = dayjs(comment.created_at).format("HH:mm DD.MM.YYYY");
  return (
    <article className="comment-card">
      <img src="/images/default-profile-img.jpeg" alt="profile-image" className="profile-image"/>

      <div className="comment-wrapper">
        <header className="comment-header">
          <h3 className="username">{comment.author.username}</h3>
          <span className="date-created">{formatedDate}</span>
        </header>

        <p className="content">{comment.content}</p>
      </div>
    </article>
  )
}

export default CommentCard;
