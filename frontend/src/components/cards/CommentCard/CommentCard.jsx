import dayjs from "dayjs";
import "./CommentCard.css";
import { Link } from "react-router";

const CommentCard = ({ comment }) => {
  const formatedDate = dayjs(comment.created_at).format("HH:mm DD.MM.YYYY");
  return (
    <article className="comment-card">
      <Link className="profile-link image" to={`profile/${comment.author.id}`}>
        <img
          src={
            comment.author.profile.profile_image
              ? comment.author.profile.profile_image
              : "/images/default-profile-img.jpeg"
          }
          alt="profile-image"
          className="profile-image"
        />
      </Link>

      <div className="comment-wrapper">
        <header className="comment-header">
          <h3 className="username">
            <Link
              className="profile-link username"
              to={`profile/${comment.author.id}`}
            >
              {comment.author.username}
            </Link>
          </h3>
          <span className="date-created">{formatedDate}</span>
        </header>

        <p className="content">{comment.content}</p>
      </div>
    </article>
  );
};

export default CommentCard;
