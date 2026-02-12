import { useState } from "react";
import api from "../../../api/api.js";
import formatCoordinates from "../../../utils/formatCoordinates.js";
import "./LocationCard.css";

const LocationCard = ({ post, location, currentUser, setFound }) => {
  const [isValid, setIsValid] = useState(location.is_valid); // This is if the pet was found in this location

  console.log("Location: " + location);
  const latitude = location.latitude;
  const longitude = location.longitude;

  const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

  // This returns more human-readable coordinates
  const markLocationAsValid = async () => {
    try {
      await api.patch(`posts/${post.id}/`, { found: true });
      await api.patch(`posts/location/${location.id}/`, { is_valid: true });
      setFound(true);
      setIsValid(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <article className={`location-card ${isValid && "valid"}`}>
      <img
        className="profile-image"
        src={
          post.author.profile.profile_image
            ? post.author.profile.profile_image
            : "/images/default-profile-img.jpeg"
        }
        alt="profile image"
      />{" "}
      {/*TODO: check whether the user has a profile image*/}
      <div className="location-info-wrapper">
        <p className="pointed-by-text">
          <span className="username">
            {location.author ? location.author.username : "Anonymous user"}
          </span>{" "}
          has pointed out the following position:
          <a className="location-url" target="_blank" href={locationUrl}>
            {formatCoordinates(latitude)} - {formatCoordinates(longitude)}
          </a>
        </p>
      </div>
      {currentUser?.id === post.author.id && (
        <button onClick={markLocationAsValid} className="found-btn">
          Found
        </button>
      )}
    </article>
  );
};

export default LocationCard;
