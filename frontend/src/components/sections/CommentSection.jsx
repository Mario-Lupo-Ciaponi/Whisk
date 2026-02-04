import "./CommentSection.css";
import CommentCard from "../cards/CommentCard.jsx";

const CommentSection = ({ comments }) => {
  return (
    <section className="comment-section">
      {comments.map((comment) => {
        return <CommentCard comment={comment} />;
      })}
    </section>
  );
};

export default CommentSection;
