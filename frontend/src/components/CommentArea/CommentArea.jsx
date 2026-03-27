import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import CommentSection from "../sections/CommentSection/CommentSection.jsx";
import CommentCreateForm from "../forms/CommentCreateForm/CommentCreateForm.jsx";
import "./CommentArea.css";

const CommentArea = ({
  isVisible,
  onClose,
  post,
  comments,
  setComments,
  setCommentsCount,
  navigate,
}) => {
  return (
    <div className={`comment-area ${isVisible ? "comment-area--active" : ""}`}>
      <button onClick={onClose} className="comment-area__close-btn">
        <FontAwesomeIcon icon={faX} />
      </button>

      <CommentCreateForm
        post={post}
        setComments={setComments}
        setCommentsCount={setCommentsCount}
        navigate={navigate}
      />

      <CommentSection comments={comments} />
    </div>
  );
};

export default CommentArea;
