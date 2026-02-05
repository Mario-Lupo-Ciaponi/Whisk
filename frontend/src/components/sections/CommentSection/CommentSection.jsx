import CommentCard from "../../cards/CommentCard/CommentCard.jsx";
import "./CommentSection.css";

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
