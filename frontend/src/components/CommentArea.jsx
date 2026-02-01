import CommentCreateForm from "./forms/CommentCreateForm.jsx";
import "./CommentArea.css";

const CommentArea = ({ commentAreaRef, post }) => {
  return (
    <div ref={commentAreaRef} className="comment-area">
      <CommentCreateForm post={post} />
    </div>
  )
}

export default CommentArea;
