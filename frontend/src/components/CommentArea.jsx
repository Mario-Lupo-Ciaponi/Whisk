import CommentCreateForm from "./forms/CommentCreateForm.jsx";
import "./CommentArea.css";
import CommentSection from "./sections/CommentSection.jsx";

const CommentArea = ({ activeSection, post, comments, setComments }) => {
  return (
    <div className={`comment-area ${activeSection === "comment" ? "active" : "none"}`}>
      <CommentCreateForm
        post={post}
        setComments={setComments}
      />

      <CommentSection comments={comments} />
    </div>
  )
}

export default CommentArea;
