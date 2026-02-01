import CommentCreateForm from "./forms/CommentCreateForm.jsx";
import "./CommentArea.css";
import CommentSection from "./sections/CommentSection.jsx";

const CommentArea = ({ commentAreaRef, post, comments, setComments }) => {
  return (
    <div ref={commentAreaRef} className="comment-area">
      <CommentCreateForm
        post={post}
        setComments={setComments}
      />

      <CommentSection comments={comments} />
    </div>
  )
}

export default CommentArea;
