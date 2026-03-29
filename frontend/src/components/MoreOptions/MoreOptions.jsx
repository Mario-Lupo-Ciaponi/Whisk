import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import api from "../../api/api.js";
import Loader from "../Loader.jsx";
import "./MoreOptions.css";

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
  const { t } = useTranslation();

  const moreOptionsRef = useRef(null);

  const showActions = () => moreOptionsRef.current.classList.toggle("active");

  const copyPostUrl = async () => {
    setIsCopyingLoading(true);

    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/post/${post.id}`,
      );

      toast.success(t("moreOptions.copied"));
    } catch {
      toast.error(t("errors.somethingWentWrong"));
    } finally {
      setIsCopyingLoading(false);
    }
  };

  const changePostStatus = async () => {
    setIsChangingPostStatus(true);

    try {
      await api.patch(`posts/${post.id}/`, { found: !found });
      setFound(!found);

      toast.success(t("moreOptions.statusChanged", { status: statusText }));
    } catch {
      toast.error(t("errors.somethingWentWrong"));
    } finally {
      setIsChangingPostStatus(false);
    }
  };

  const deletePost = async () => {
    setIsPostDeleting(true);

    try {
      await api.delete(`posts/${post.id}/`);
      toast.success(t("moreOptions.deleted"));
      window.location.reload();
    } catch {
      toast.error(t("errors.somethingWentWrong"));
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
      <button
        onClick={showActions}
        className="show-more"
        aria-label="Show post options"
      >
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </button>
      <ul ref={moreOptionsRef} className="more-options-menu">
        <li className="option-item">
          <button onClick={copyPostUrl} className="option">
            {isCopyingLoading ? (
              <Loader height={20} width={20} />
            ) : (
              t("moreOptions.share")
            )}
          </button>
        </li>
        <li className="option-item">
          <button onClick={savePost} className="option">
            {isSavingLoading ? (
              <Loader height={20} width={20} />
            ) : (
              t("moreOptions.save")
            )}
          </button>
        </li>
        {post.author.id === currentUser?.id || currentUser?.is_staff ? (
          <>
            <li className="option-item">
              <button onClick={changePostStatus} className="option">
                {isChangingPostStatus ? (
                  <Loader height={20} width={20} />
                ) : (
                  t("moreOptions.changeStatus")
                )}
              </button>
            </li>
            <li onClick={makeEditFormVisible} className="option-item">
              <button className="option">{t("moreOptions.edit")}</button>
            </li>
            <li onClick={deletePost} className="option-item">
              <button className="option danger">
                {isPostDeleting ? (
                  <Loader height={20} width={20} />
                ) : (
                  t("moreOptions.delete")
                )}
              </button>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};

export default MoreOptions;
