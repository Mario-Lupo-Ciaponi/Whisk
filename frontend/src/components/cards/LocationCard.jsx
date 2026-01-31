import "./LocationCard.css";
import api from "../../api/api.js";

const LocationCard = ({ post, location, currentUser, setFound }) => {
  const latitude = location.latitude;
  const longitude = location.longitude;

  const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

  // This returns more human-readable coordinates
  const formatCoordinates = (c) => Number(c).toFixed(3);

  const markLocationAsValid = () => {
    api.patch(`posts/${post.id}/`, {found: true});
    setFound(true);
  }

  return (
    <article className="location-card">
      <img
        className="profile-image"
        src="images/default-profile-img.jpeg"
        alt="profile image"
      />{" "}
      {/*TODO: check whether the user has a profile image*/}
      <div className="location-info-wrapper">
        <p className="pointed-by-text">
          <span className="username">
            {location.author || "Anonymous user"}
          </span>{" "}
          has pointed out the following position:
          <a className="location-url" target="_blank" href={locationUrl}>
            {formatCoordinates(latitude)} - {formatCoordinates(longitude)}
          </a>
        </p>
      </div>

      {currentUser.id === post.author.id && <button onClick={markLocationAsValid} className="found-btn">Found</button>}
    </article>
  );
};

export default LocationCard;
