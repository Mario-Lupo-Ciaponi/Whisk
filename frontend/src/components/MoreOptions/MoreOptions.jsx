import { useState, useRef } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import api from "../../api/api.js";
import "./MoreOptions.css";

const MoreOptions = ({
                       post,
                       currentUser,
                       setIsEditFormVisible,
                       setIsFilterVisible,
                       setFound,
                       found,
                       statusText,
                       savePost  }) => {
  const moreOptionsRef = useRef(null);

  const showActions = () => moreOptionsRef.current.classList.toggle("active");

  const copyPostUrl = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/post/${post.id}`,
      );

      toast.success("Post copied to clipboard!");
    } catch (e) {
      toast.error("Something went wrong. Please try again later!");
    }
  };

  const changePostStatus = async () => {
    try {
      await api.patch(`posts/${post.id}/`, { found: !found });
      setFound(!found);

      toast.success(`Changed post status to ${statusText}`);
    } catch {
      toast.error("Something went wrong. Please try again later!");
    }
  };

  const deletePost = async () => {
    await api.delete(`posts/${post.id}/`);
    window.location.reload();
    toast.success("Post deleted successfully!");

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
                Save
              </button>
            </li>
            <li className="option-item">
              <button onClick={copyPostUrl} className="option">
                Share
              </button>
            </li>
            {post.author.id === currentUser?.id && (
              <>
                <li className="option-item">
                  <button onClick={changePostStatus} className="option">
                    Update status
                  </button>
                </li>
                <li onClick={makeEditFormVisible} className="option-item">
                  <button className="option">Edit</button>
                </li>
                <li onClick={deletePost} className="option-item">
                  <button className="option danger">Delete</button>
                </li>
              </>
            )}
          </ul>
        </div>
  )
}

export default MoreOptions;
