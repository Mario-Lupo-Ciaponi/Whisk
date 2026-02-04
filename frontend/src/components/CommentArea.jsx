import CommentCreateForm from "./forms/CommentCreateForm.jsx";
import "./CommentArea.css";
import CommentSection from "./sections/CommentSection.jsx";

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
