import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import {
  faMapLocationDot,
  faComment,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import MoreOptions from "../../MoreOptions/MoreOptions.jsx";
import MapSection from "../../sections/MapSection/MapSection.jsx";
import CommentArea from "../../CommentArea/CommentArea.jsx";
import PostEditForm from "../../forms/PostEditForm/PostEditForm.jsx";
import NotificationMessage from "../../NotificationMessage/NotificationMessage.jsx";
import DarkOpacityFilter from "../../DarkOpacityFilter/DarkOpacityFilter.jsx";
import api from "../../../api/api.js";
import "./PostCard.css";

const PostCard = ({ post, currentUser, navigate, setIsFilterVisible }) => {
  const [locations, setLocations] = useState([]);
  const [comments, setComments] = useState([]);
  const [found, setFound] = useState(post.found);
  const [activeSection, setActiveSection] = useState("none");
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [isSavingLoading, setIsSavingLoading] = useState(false);
  // Count states:
  const [locationsCount, setLocationsCount] = useState(post.locations_count);
  const [commentsCount, setCommentsCount] = useState(post.comments_count);
  const [saveCount, setSaveCount] = useState(post.save_count);

  useEffect(() => {
    const getPostLocations = () => setLocations(post.locations);

    const getComments = () => setComments(post.comments);

    getPostLocations();
    getComments();
  }, []);

  const statusText = found ? "Found" : "Not Found";

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

      toast.success(`Post ${save ? "saved" : "unsaved"} successfully!`);
    } catch (e) {
      if (e.status === 401) {
        toast.error("You are not authenticated. Please login!");
        navigate("login/");
      } else {
        toast.error("Somthing went wrong. Please try again later!");
      }
    } finally {
      setIsSavingLoading(false);
    }
  };

  return (
    <article className="post-card" key={post.id}>
      {notificationText && (
        <div className="notification-div">
          <NotificationMessage text={notificationText} messageType="info" />
        </div>
      )}

      <div className="top">
        <div className="user-container">
          <Link className="profile-link image" to={`profile/${post.author.id}`}>
            <img
              className="profile-image"
              src={
                post.author.profile.profile_image
                  ? post.author.profile.profile_image
                  : "/images/default-profile-img.jpeg"
              }
              alt="profile image"
            />
          </Link>
          <p className="username">
            <Link
              className="profile-link username"
              to={`profile/${post.author.id}`}
            >
              {post.author.username}
            </Link>
          </p>
          <span className="city">({post.city.name})</span>
          <span className={`status ${found ? "found" : "not-found"}`}>
            {statusText}
          </span>
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
        {/*<div className="more-options-container">*/}
        {/*  <button onClick={showActions} className="show-more">*/}
        {/*    <FontAwesomeIcon icon={faEllipsisVertical} />*/}
        {/*  </button>*/}
        {/*  <ul ref={moreOptionsRef} className="more-options-menu">*/}
        {/*    <li className="option-item">*/}
        {/*      <button onClick={savePost} className="option">*/}
        {/*        Save*/}
        {/*      </button>*/}
        {/*    </li>*/}
        {/*    <li className="option-item">*/}
        {/*      <button onClick={copyPostUrl} className="option">*/}
        {/*        Share*/}
        {/*      </button>*/}
        {/*    </li>*/}
        {/*    {post.author.id === currentUser?.id && (*/}
        {/*      <>*/}
        {/*        <li className="option-item">*/}
        {/*          <button onClick={changePostStatus} className="option">*/}
        {/*            Update status*/}
        {/*          </button>*/}
        {/*        </li>*/}
        {/*        <li onClick={makeEditFormVisible} className="option-item">*/}
        {/*          <button className="option">Edit</button>*/}
        {/*        </li>*/}
        {/*        <li onClick={deletePost} className="option-item">*/}
        {/*          <button className="option danger">Delete</button>*/}
        {/*        </li>*/}
        {/*      </>*/}
        {/*    )}*/}
        {/*  </ul>*/}
        {/*</div>*/}
      </div>

      <div className="image-container">
        <img className="post-image" src={post.image} alt="post-image" />
      </div>

      <div className="caption">
        <h3 className="title">{post.title}</h3>
        <p className="description">{post.description}</p>
      </div>
      <hr className="divider" />
      <div className="actions">
        <button
          onClick={() => toggleSection("map")}
          className="action mark-position"
        >
          <FontAwesomeIcon icon={faMapLocationDot} />
          <span className="count">{locationsCount}</span>
        </button>
        <button
          onClick={() => toggleSection("comment")}
          className="action comment-post"
        >
          <FontAwesomeIcon icon={faComment} />
          <span className="count">{commentsCount}</span>
        </button>
        <button onClick={savePost} className="action mark-position">
          <FontAwesomeIcon icon={faBookmark} />
          <span className="count">{saveCount}</span>
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
