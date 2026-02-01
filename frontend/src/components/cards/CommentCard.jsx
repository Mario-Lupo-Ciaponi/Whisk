import "./CommentCard.css";

const CommentCard = ({ comment }) => {
  return (
    <article className="comment-card">
      <img src="/images/default-profile-img.jpeg" alt="profile-image"/>

      <div className="comment-wrapper">
        <header className="comment-header">
          <h3 className="username">{comment.author.username}</h3>
          <span className="date-created">{comment.created_at}</span>
        </header>

        <p className="content">{comment.content}</p>
      </div>
    </article>
  )
}

export default CommentCard;
