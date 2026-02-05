import CommentSection from "../sections/CommentSection/CommentSection.jsx";
import CommentCreateForm from "../forms/CommentCreateForm/CommentCreateForm.jsx";
import "./CommentArea.css";

const CommentArea = ({
  activeSection,
  post,
  comments,
  setComments,
  currentUser,
  navigate,
}) => {
  return (
    <div
      className={`comment-area ${activeSection === "comment" ? "active" : "none"}`}
    >
      <CommentCreateForm
        post={post}
        setComments={setComments}
        currentUser={currentUser}
        navigate={navigate}
      />

      <CommentSection comments={comments} />
    </div>
  );
};

export default CommentArea;
