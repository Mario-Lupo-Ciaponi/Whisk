import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api/api.js";
import "./CommentCreateForm.css";

const CommentCreateForm = ({
  post,
  setComments,
  setCommentsCount,
  navigate,
}) => {
  const [content, setContent] = useState("");

  const createComment = async (event) => {
    event.preventDefault();

    if (!content) toast.error("The text of the comment should not be empty!")

    try {
      const response = await api.post("posts/comments/", {
        content,
        post_input: post.id,
      });
      setComments((prev) => [...prev, response.data]);
      setCommentsCount((prev) => prev + 1);

      toast.success("Commented on post successfully!")
    } catch (e) {
      if (e.response?.status === 401) {
        toast.error("You need to be authenticated to comment. Please login first!")
        navigate("/login");
      } else {
        toast.error("Something went wrong. Please try again later!")
      }
    }
  };

  return (
    <form onSubmit={createComment} className="comment-create-form">
      <input
        className="comment-content-input"
        placeholder="Add a comment..."
        onChange={(event) => {
          setContent(event.target.value);
        }}
        type="text"
      />

      <button className="submit-btn">Comment</button>
    </form>
  );
};

export default CommentCreateForm;
