import {useEffect, useRef, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faMapLocationDot, faComment, faBookmark } from "@fortawesome/free-solid-svg-icons";
import api from "../../api/api.js";
import MapSection from "../sections/MapSection.jsx";
import "./PostCard.css";

const PostCard = ({ post }) => {
    const [locations, setLocations] = useState([]);
    const [found, setFound] = useState(post.found);
    const moreOptionsRef = useRef(null);
    const mapSectionRef = useRef(null);

    useEffect(() => {
        const getPostLocations = async () => {
            const response = await api.get(`posts/location/?post=${post.id}`);
            setLocations(response.data);
        }

        try {
            getPostLocations();
        } catch (e) {
            console.log(e.response.data);
        }
    }, []);

    const statusText = found ? "Found" : "Not Found";

    const showActions = () =>
        moreOptionsRef.current.classList.toggle("active");
    const toggleMapSection = () =>
        mapSectionRef.current.classList.toggle("active");

    const deletePost = async () => {
        await api.delete(`posts/${post.id}/`);
        alert("Post deleted successfully!");
        window.location.reload();
    }

    const changePostStatus = async () => {
        await api.patch(`posts/${post.id}/`, {found: !found})
        setFound(!found);
    }

    return (
        <article className="post-card" key={post.id}>
            <div className="top">
                <div className="user-container">
                    <img className="profile-image" src="/images/default-profile-img.jpeg" alt="profile image"/>
                    <p className="username">{post.author.username}</p>
                    <span className="city">({post.city.name})</span>
                    <span className={`status ${found ? 'found' : 'not-found'}`}>
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
                      <li className="option-item">
                          <button onClick={changePostStatus} className="option">Update status</button>
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
                    <span className="count">{locations.length}</span>
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

            <MapSection
                mapSectionRef={mapSectionRef}
                post={post}
                locations={locations}
                setLocations={setLocations}
            />
        </article>
    )
}

export default PostCard;
