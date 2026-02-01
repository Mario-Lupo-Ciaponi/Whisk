import {useState} from "react";
import api from "../../api/api.js";
import "./CommentCreateForm.css";

const CommentCreateForm = ({ post, setComments }) => {
  const [content, setContent] = useState("");

  const addComment = async (event) => {
    event.preventDefault();

    if (!content) return;

    try {
      const response = await api.post("posts/comments/", { content, post_input: post.id });
      setComments(prev => [...prev, response.data]);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form onSubmit={addComment} className="comment-create-form">
      <input
        className="comment-content-input"
        placeholder="Add a comment..."
        onChange={event => {
          setContent(event.target.value);
        }}
        type="text"
      />

      <button className="submit-btn">Comment</button>
    </form>
  )
}

export default CommentCreateForm;
