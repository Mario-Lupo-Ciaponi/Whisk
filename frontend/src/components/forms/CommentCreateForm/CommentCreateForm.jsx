import { useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import Loader from "../../Loader.jsx";
import api from "../../../api/api.js";
import "./CommentCreateForm.css";

const CommentCreateForm = ({
  post,
  setComments,
  setCommentsCount,
  navigate,
}) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const createComment = async (event) => {
    event.preventDefault();

    if (!content)
      toast.error("The content of the comment should not be empty!");

    setIsLoading(true);

    try {
      const response = await api.post("posts/comments/", {
        content,
        post_input: post.id,
      });
      setComments((prev) => [...prev, response.data]);
      setCommentsCount((prev) => prev + 1);

      setContent("");

      toast.success(t("comments.commentSuccess"));
    } catch (e) {
      if (e.response?.status === 401) {
        toast.error(
          t("comments.loginRequired")
        );
        navigate("/login");
      } else {
        toast.error(t("errors.somethingWentWrong"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={createComment} className="comment-create-form">
      <input
        className="comment-content-input"
        placeholder={t("comments.placeholder")}
        onChange={(event) => {
          setContent(event.target.value);
        }}
        value={content}
        type="text"
      />

      <button className="submit-btn">
        {isLoading ? <Loader width={20} height={20} /> : t("comments.submit")}
      </button>
    </form>
  );
};

export default CommentCreateForm;
