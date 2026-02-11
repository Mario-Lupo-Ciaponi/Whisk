import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faMapLocationDot,
  faComment,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import MapSection from "../../sections/MapSection/MapSection.jsx";
import CommentArea from "../../CommentArea/CommentArea.jsx";
import api from "../../../api/api.js";
import "./PostCard.css";

const PostCard = ({ post, currentUser, navigate }) => {
  const [locations, setLocations] = useState([]);
  const [comments, setComments] = useState([]);
  const [found, setFound] = useState(post.found);
  const [activeSection, setActiveSection] = useState("none");
  const [saveCount, setSaveCount] = useState(post.save_count);

  const moreOptionsRef = useRef(null);

  useEffect(() => {
    const getPostLocations = () => setLocations(post.locations);

    const getComments = () => setComments(post.comments);

    getPostLocations();
    getComments();
  }, []);

  const statusText = found ? "Found" : "Not Found";

  const showActions = () => moreOptionsRef.current.classList.toggle("active");

  const toggleSection = (name) =>
    setActiveSection((prev) => (prev === name ? "none" : name));

  const deletePost = async () => {
    await api.delete(`posts/${post.id}/`);
    alert("Post deleted successfully!");
    window.location.reload();
  };

  const changePostStatus = async () => {
    try {
      await api.patch(`posts/${post.id}/`, { found: !found });
      setFound(!found);
    } catch (e) {
      console.log(e);
    }
  };

  const savePost = async () => {
    try {
      await api.post(`posts/${post.id}/save/`);
    } catch (e) {
      if (e.status === 401) {
        navigate("login/");
      }

      console.error(e);
    }
  };

  return (
    <article className="post-card" key={post.id}>
      <div className="top">
        <div className="user-container">
          <img
            className="profile-image"
            src="/images/default-profile-img.jpeg"
            alt="profile image"
          />
          <p className="username">{post.author.username}</p>
          <span className="city">({post.city.name})</span>
          <span className={`status ${found ? "found" : "not-found"}`}>
            {statusText}
          </span>
        </div>

        <div className="more-options-container">
          <button onClick={showActions} className="show-more">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
          <ul ref={moreOptionsRef} className="more-options-menu">
            <li className="option-item">
              <button className="option">Save</button>
            </li>
            <li className="option-item">
              <button className="option">Share</button>
            </li>
            {post.author.id === currentUser?.id && (
              <>
                <li className="option-item">
                  <button onClick={changePostStatus} className="option">
                    Update status
                  </button>
                </li>
                <li className="option-item">
                  <button className="option">Edit</button>
                </li>
                <li onClick={deletePost} className="option-item">
                  <button className="option danger">Delete</button>
                </li>
              </>
            )}
          </ul>
        </div>
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
          <span className="count">{post.locations_count}</span>
        </button>
        <button
          onClick={() => toggleSection("comment")}
          className="action comment-post"
        >
          <FontAwesomeIcon icon={faComment} />
          <span className="count">{post.comments_count}</span>
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
        currentUser={currentUser}
        setFound={setFound}
      />

      <CommentArea
        activeSection={activeSection}
        post={post}
        comments={comments}
        setComments={setComments}
        currentUser={currentUser}
        navigate={navigate}
      />
    </article>
  );
};

export default PostCard;
