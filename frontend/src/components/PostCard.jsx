import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faMapLocationDot, faComment, faBookmark } from "@fortawesome/free-solid-svg-icons";
import "./PostCard.css";

function PostCard({ post }) {
    const moreOptionsRef = useRef(null);

    function showActions() {
        moreOptionsRef.current.classList.toggle("active")
    }

    console.log(post.image)

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
                      <li className="option-item">
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
                <button className="action mark-position"><FontAwesomeIcon icon={faMapLocationDot} /></button>
                <button className="action comment-post"><FontAwesomeIcon icon={faComment} /></button>
                <button className="action mark-position"><FontAwesomeIcon icon={faBookmark} /></button>
            </div>
        </article>
    )
}

export default PostCard;
