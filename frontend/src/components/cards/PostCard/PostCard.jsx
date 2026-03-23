import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import {
  faMapLocationDot,
  faLocationDot,
  faComment,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import MoreOptions from "../../MoreOptions/MoreOptions.jsx";
import SeeMore from "../../SeeMore/SeeMore.jsx";
import MapSection from "../../sections/MapSection/MapSection.jsx";
import CommentArea from "../../CommentArea/CommentArea.jsx";
import PostEditForm from "../../forms/PostEditForm/PostEditForm.jsx";
import DarkOpacityFilter from "../../DarkOpacityFilter/DarkOpacityFilter.jsx";
import api from "../../../api/api.js";
import "./PostCard.css";

const PostCard = ({ post, currentUser, navigate, setIsFilterVisible }) => {
  const [locations, setLocations] = useState([]);
  const [comments, setComments] = useState([]);
  const [found, setFound] = useState(post.found);
  const [activeSection, setActiveSection] = useState("none");
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isSavingLoading, setIsSavingLoading] = useState(false);
  // Count states:
  const [locationsCount, setLocationsCount] = useState(post.locations_count);
  const [commentsCount, setCommentsCount] = useState(post.comments_count);
  const [saveCount, setSaveCount] = useState(post.save_count);

  const { t } = useTranslation();

  useEffect(() => {
    const getPostLocations = () => setLocations(post.locations);

    const getComments = () => setComments(post.comments);

    getPostLocations();
    getComments();
  }, []);

  const statusText = found ? t("postCard.found") : t("postCard.notFound");

  const toggleSection = (name) =>
    setActiveSection((prev) => (prev === name ? "none" : name));

  const savePost = async () => {
    setIsSavingLoading(true);
    try {
      const response = await api.post(`posts/${post.id}/save/`);
      const { save } = response.data;

      if (save) {
        setSaveCount((prev) => prev + 1);
      } else {
        setSaveCount((prev) => prev - 1);
      }

      toast.success(save ? t("postCard.postSaved") : t("postCard.postUnsaved"));
    } catch (e) {
      if (e.status === 401) {
        toast.error(t("postCard.notAuthenticated"));
        navigate("login/");
      } else {
        toast.error(t("error"));
      }
    } finally {
      setIsSavingLoading(false);
    }
  };

  return (
    <article className="post-card" key={post.id}>
      <div className="post-card__header">
        <div className="post-card__author">
          <Link
            className="post-card__avatar-link"
            to={`profile/${post.author.id}`}
          >
            <img
              className="post-card__avatar"
              src={
                post.author.profile.profile_image
                  ? post.author.profile.profile_image
                  : "/images/default-profile-img.jpeg"
              }
              alt="profile image"
            />
          </Link>
          <div className="post-card__author-info">
            <Link
              className="post-card__author-name"
              to={`profile/${post.author.id}`}
            >
              {post.author.username}
            </Link>
            <span className="post-card__author-location">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="post_card__location_icon"
              />
              {post.city.name}
            </span>
          </div>
        </div>
        <MoreOptions
          post={post}
          currentUser={currentUser}
          setIsEditFormVisible={setIsEditFormVisible}
          setIsFilterVisible={setIsFilterVisible}
          found={found}
          setFound={setFound}
          statusText={statusText}
          isSavingLoading={isSavingLoading}
          savePost={savePost}
        />
      </div>

      <div className="post-card__image-wrapper">
        <img className="post-card__image" src={post.image} alt="post-image" />
        <span
          className={`post-card__badge post-card__badge--${found ? "found" : "not-found"}`}
        >
          {statusText}
        </span>
      </div>

      <div className="post-card__body">
        <h2 className="post-card__title">{post.title}</h2>
        <p className="post-card__description">
          <SeeMore text={post.description} maxLength={30} />
        </p>
        <div className="post-card__meta">
          <span className="post-card__time">
            {new Date(post.posted_on).toLocaleString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="post-card__save-count">
            {saveCount} {t("postCard.saves")}
          </span>
        </div>
      </div>

      <hr className="post-card__divider" />

      <div className="post-card__actions">
        <button
          onClick={() => toggleSection("map")}
          className="post-card__action"
        >
          <FontAwesomeIcon icon={faMapLocationDot} />
          <span>{t("postCard.map")}</span>
        </button>
        <button
          onClick={() => toggleSection("comment")}
          className="post-card__action"
        >
          <FontAwesomeIcon icon={faComment} />
          <span>{t("postCard.comment")}</span>
        </button>
        <button onClick={savePost} className="post-card__action">
          <FontAwesomeIcon icon={faBookmark} />
          <span>{t("postCard.save")}</span>
        </button>
      </div>

      <MapSection
        activeSection={activeSection}
        post={post}
        locations={locations}
        setLocations={setLocations}
        setLocationsCount={setLocationsCount}
        currentUser={currentUser}
        setFound={setFound}
      />

      <CommentArea
        activeSection={activeSection}
        post={post}
        comments={comments}
        setComments={setComments}
        setCommentsCount={setCommentsCount}
        navigate={navigate}
      />

      {isEditFormVisible && (
        <PostEditForm
          post={post}
          currentUser={currentUser}
          isEditFormVisible={isEditFormVisible}
          setIsEditFormVisible={setIsEditFormVisible}
          setIsFilterVisible={setIsFilterVisible}
          navigate={navigate}
        />
      )}
    </article>
  );
};

export default PostCard;
