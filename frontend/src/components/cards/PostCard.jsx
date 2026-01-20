import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faMapLocationDot, faComment, faBookmark } from "@fortawesome/free-solid-svg-icons";
import api from "../../api/api.js";
import LocationSection from "../LocationSection.jsx";
import "./PostCard.css";

const PostCard = ({ post }) => {
    const moreOptionsRef = useRef(null);
    const mapSectionRef = useRef(null);

    const showActions = () => moreOptionsRef.current.classList.toggle("active");
    const toggleMapSection = () => mapSectionRef.current.classList.toggle("active");

    const deletePost = async () => {
        await api.delete(`posts/${post.id}/`);
        alert("Post deleted successfully!");
        window.location.reload();
    }

    return (
        <article className="post-card" key={post.id}>
            <div className="top">
                <div className="user-container">
                    <img className="profile-image" src="/images/default-profile-img.jpeg" alt="profile image"/>
                    <p className="username">{post.author}</p>
                    <span className="city">({post.city})</span>
                    {post.found ?
                        <span className="status found">Found</span>
                        :
                        <span className="status not-found">Not Found</span>
                    }
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
                      <li className="option-item">
                          <button className="option">Update status</button>
                      </li>
                      <li className="option-item">
                          <button className="option">Edit</button>
                      </li>
                      <li onClick={deletePost} className="option-item">
                          <button className="option danger">Delete</button>
                      </li>
                    </ul>
                </div>

            </div>

            <img className="post-image" src={post.image} alt="post-image"/>

            <div className="caption">
                <h3 className="title">{post.title}</h3>
                <p className="description">{post.description}</p>
            </div>
            <hr className="divider"/>
            <div className="actions">
                <button onClick={toggleMapSection} className="action mark-position">
                    <FontAwesomeIcon icon={faMapLocationDot} />
                    <span className="count">{post.locations.length}</span>
                </button>
                <button className="action comment-post">
                    <FontAwesomeIcon icon={faComment} />
                    <span className="count">0</span>
                </button>
                <button className="action mark-position">
                    <FontAwesomeIcon icon={faBookmark} />
                    <span className="count">0</span>
                </button>
            </div>

            <LocationSection mapSectionRef={mapSectionRef} post={post} />
        </article>
    )
}

export default PostCard;
