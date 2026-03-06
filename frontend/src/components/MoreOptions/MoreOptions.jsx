import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import api from "../../api/api.js";
import "./MoreOptions.css";
import Loader from "../Loader.jsx";

const MoreOptions = ({
  post,
  currentUser,
  setIsEditFormVisible,
  setIsFilterVisible,
  setFound,
  found,
  statusText,
  isSavingLoading,
  savePost,
}) => {
  const [isCopyingLoading, setIsCopyingLoading] = useState(false);
  const [isChangingPostStatus, setIsChangingPostStatus] = useState(false);
  const [isPostDeleting, setIsPostDeleting] = useState(false);

  const moreOptionsRef = useRef(null);

  const showActions = () => moreOptionsRef.current.classList.toggle("active");

  const copyPostUrl = async () => {
    setIsCopyingLoading(true);

    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/post/${post.id}`,
      );

      toast.success("Post copied to clipboard!");
    } catch {
      toast.error("Something went wrong. Please try again later!");
    } finally {
      setIsCopyingLoading(false);
    }
  };

  const changePostStatus = async () => {
    setIsChangingPostStatus(true);

    try {
      await api.patch(`posts/${post.id}/`, { found: !found });
      setFound(!found);

      toast.success(`Changed post status to ${statusText}`);
    } catch {
      toast.error("Something went wrong. Please try again later!");
    } finally {
      setIsChangingPostStatus(false);
    }
  };

  const deletePost = async () => {
    setIsPostDeleting(true);

    try {
      await api.delete(`posts/${post.id}/`);
      toast.success("Post deleted successfully!");
      window.location.reload();
    } catch {
      toast.error("Something went wrong! Please try again later!")
    } finally {
      setIsPostDeleting(false);
    }

    // TODO: go to a different page for user confirmation!!!
  };

  const makeEditFormVisible = () => {
    setIsEditFormVisible(true);
    setIsFilterVisible(true);
  };

  return (
    <div className="more-options-container">
      <button onClick={showActions} className="show-more">
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </button>
      <ul ref={moreOptionsRef} className="more-options-menu">
        <li className="option-item">
          <button onClick={savePost} className="option">
            {isSavingLoading ? <Loader height={20} width={20} /> : "Save"}
          </button>
        </li>
        <li className="option-item">
          <button onClick={copyPostUrl} className="option">
            {isCopyingLoading ? <Loader height={20} width={20} /> : "Share"}
          </button>
        </li>
        {post.author.id === currentUser?.id && (
          <>
            <li className="option-item">
              <button onClick={changePostStatus} className="option">
                {isChangingPostStatus ? <Loader height={20} width={20} /> : "Change Status"}
              </button>
            </li>
            <li onClick={makeEditFormVisible} className="option-item">
              <button className="option">Edit</button>
            </li>
            <li onClick={deletePost} className="option-item">
              <button className="option danger">
                {isPostDeleting ? <Loader height={20} width={20} /> : "Delete"}
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default MoreOptions;
