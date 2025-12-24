import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faMapLocationDot, faComment, faBookmark } from "@fortawesome/free-solid-svg-icons";
import "./PostCard.css";

function PostCard({ post }) {
    return (
        <article className="post-card">
            <div className="top">
                <div className="user-container">
                    <img className="profile-image" src="/images/default-profile-img.jpeg" alt="profile image"/>
                    <p className="username">{post.username}</p>
                </div>
                <button className="show-more">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
            </div>

            <img className="post-image" src="/images/test-image.webp" alt="post-image"/>

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
