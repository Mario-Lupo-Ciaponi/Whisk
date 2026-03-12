import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import toast from "react-hot-toast";
import api from "../../../api/api.js";
import formatCoordinates from "../../../utils/formatCoordinates.js";
import "./LocationCard.css";

const LocationCard = ({ post, location, currentUser, setFound }) => {
  const [isValid, setIsValid] = useState(location.is_valid); // This is if the pet was found in this location
  const { t } = useTranslation();

  const latitude = location.latitude;
  const longitude = location.longitude;

  const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  const coordinates = `${formatCoordinates(latitude)} - ${formatCoordinates(longitude)}`;

  // This returns more human-readable coordinates
  const markLocationAsValid = async () => {
    try {
      await api.patch(`posts/${post.id}/`, { found: true });
      await api.patch(`posts/location/${location.id}/`, { is_valid: true });
      setFound(true);
      setIsValid(true);
    } catch (e) {
      toast.error(t("error"));
    }
  };

  return (
    <article className={`location-card ${isValid && "valid"}`}>
      <div className="profile-image-container">
        {location.author ? (
          <Link
            className="profile-link image"
            to={`profile/${location.author?.id}`}
          >
            <img
              className="profile-image"
              src={
                location.author?.profile.profile_image
                  ? location.author?.profile.profile_image
                  : "/images/default-profile-img.jpeg"
              }
              alt="profile image"
            />
          </Link>
        ) : (
          <img
            className="profile-image"
            src="/images/default-profile-img.jpeg"
            alt="profile image"
          />
        )}
      </div>{" "}
      <div className="location-info-wrapper">
        <p className="pointed-by-text">
          <span className="username">
            {location.author ? (
              <Link
                className="profile-link username"
                to={`profile/${location.author.id}`}
              >
                {location.author.username}
              </Link>
            ) : (
              t("locationCard.anonymousUser")
            )}
          </span>{" "}
          {t("locationCard.pointedLocation")}
          <a className="location-url" target="_blank" href={locationUrl}>
            {location.street_address ? location.street_address : coordinates}
          </a>
        </p>
      </div>
      {currentUser?.id === post.author.id && (
        <button onClick={markLocationAsValid} className="found-btn">
          {t("locationCard.found")}
        </button>
      )}
    </article>
  );
};

export default LocationCard;
