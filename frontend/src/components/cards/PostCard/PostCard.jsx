import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import {
  faMapLocationDot,
  faLocationDot,
  faComment,
  faBookmark,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import MoreOptions from "../../MoreOptions/MoreOptions.jsx";
import SeeMore from "../../SeeMore/SeeMore.jsx";
import MapSection from "../../sections/MapSection/MapSection.jsx";
import CommentArea from "../../CommentArea/CommentArea.jsx";
import PostEditForm from "../../forms/PostEditForm/PostEditForm.jsx";
import DarkOpacityFilter from "../../DarkOpacityFilter/DarkOpacityFilter.jsx";
import api from "../../../api/api.js";
import "./PostCard.css";
import Loader from "../../Loader.jsx";

const PostCard = ({ post, currentUser, navigate, setIsFilterVisible }) => {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [locations, setLocations] = useState([]);
  const [comments, setComments] = useState([]);
  const [found, setFound] = useState(post.found);
  const [isMapModalVisible, setIsMapModalVisible] = useState(false);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isSavingLoading, setIsSavingLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPostTranslated, setIsPostTranslated] = useState(false);
  // Count states:
  const [locationsCount, setLocationsCount] = useState(post.locations_count);
  const [commentsCount, setCommentsCount] = useState(post.comments_count);
  const [saveCount, setSaveCount] = useState(post.save_count);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const getPostLocations = () => setLocations(post.locations);

    const getComments = () => setComments(post.comments);

    getPostLocations();
    getComments();
  }, [post.locations, post.comments]);

  const statusText = found ? t("postCard.found") : t("postCard.notFound");

  const openMapModal = () => setIsMapModalVisible(true);
  const closeMapModal = () => setIsMapModalVisible(false);
  const openCommentModal = () => setIsCommentModalVisible(true);
  const closeCommentModal = () => setIsCommentModalVisible(false);

  const translatePost = async () => {
    const langblyApiBaseUrl = "https://api.langbly.com/language/translate/v2";
    const langblyApiKey = import.meta.env.VITE_LANGBLY_API_KEY;

    setIsLoading(true);

    try {
      const response = await api.post(
        langblyApiBaseUrl,
        {
          q: [title, description],
          target: i18n.language,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": langblyApiKey,
          },
        },
      );

      const translatedTitle = response.data.data.translations[0].translatedText;
      const translatedDescription =
        response.data.data.translations[1].translatedText;

      setTitle(translatedTitle);
      setDescription(translatedDescription);

      toast.success(
        t("postCard.translationSuccess", "Translated successfully!"),
      );

      setIsPostTranslated(true);
    } catch (e) {
      toast.error(t("errors.somethingWentWrong"));
    } finally {
      setIsLoading(false);
    }
  };

  const backtranslatePost = () => {
    setTitle(post.title);
    setDescription(post.description);

    toast.success(t("postCard.backtranslationSuccess", "Backtranslated successfully!"));
    setIsPostTranslated(false);
  };

  const managePostTrasnlation = async () => {
    if (isPostTranslated) {
      backtranslatePost();
    } else {
      await translatePost();
    }
  };

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
        <div className="post-card__header-actions">
          <button onClick={managePostTrasnlation} className="post-card__translate-btn">
            <FontAwesomeIcon icon={faLanguage} />
            <span className="post-card__translate-text">
              {isLoading ? (
                <Loader width={15} height={15} />
              ) : (
                (isPostTranslated ? t("postCard.backtranslate", "Backtranslate") : t("postCard.translate", "Translate"))
              )}
            </span>
          </button>
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
      </div>

      <div className="post-card__image-wrapper">
        <img className="post-card__image" src={post.image} alt="post-image" />

        <div className="post-card__badges-container">
          <span
            className={`post-card__badge post-card__badge--${found ? "found" : "not-found"}`}
          >
            {statusText}
          </span>
          {post.animal_type && (
            <span className="post-card__animal-type-badge">
              {post.animal_type}
            </span>
          )}
        </div>
      </div>

      <div className="post-card__body">
        <h2 className="post-card__title">{title}</h2>
        <p className="post-card__description">
          <SeeMore text={description} maxLength={30} />
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
        <button onClick={openMapModal} className="post-card__action">
          <FontAwesomeIcon icon={faMapLocationDot} />
          <span>{t("postCard.map")}</span>
        </button>
        <button onClick={openCommentModal} className="post-card__action">
          <FontAwesomeIcon icon={faComment} />
          <span>{t("postCard.comment")}</span>
        </button>
        <button onClick={savePost} className="post-card__action">
          <FontAwesomeIcon icon={faBookmark} />
          <span>{t("postCard.save")}</span>
        </button>
      </div>

      <MapSection
        isVisible={isMapModalVisible}
        onClose={closeMapModal}
        post={post}
        locations={locations}
        setLocations={setLocations}
        setLocationsCount={setLocationsCount}
        currentUser={currentUser}
        setFound={setFound}
      />

      <CommentArea
        isVisible={isCommentModalVisible}
        onClose={closeCommentModal}
        post={post}
        comments={comments}
        setComments={setComments}
        setCommentsCount={setCommentsCount}
        navigate={navigate}
      />

      {(isMapModalVisible || isCommentModalVisible || isEditFormVisible) && (
        <DarkOpacityFilter />
      )}

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
