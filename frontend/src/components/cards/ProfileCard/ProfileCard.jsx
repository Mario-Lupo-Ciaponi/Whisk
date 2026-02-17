import ReactCountryFlag from "react-country-flag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faHandshake, faHouse } from "@fortawesome/free-solid-svg-icons";
import "./ProfileCard.css";

const ProfileCard = ({ user }) => {
  const userProfile = user.profile;

  const accountTypeIcons = {
    "pet owner": <FontAwesomeIcon icon={faPaw} />,
    volunteer: <FontAwesomeIcon icon={faHandshake} />,
    shelter: <FontAwesomeIcon icon={faHouse} />,
  };

  return (
    <article className="profile-card">
      <div className="image-container">
        <img
          className="profile-image"
          src={
            userProfile.profile_image
              ? userProfile.profile_image
              : "images/default-profile-img.jpeg"
          }
          alt="profile image"
        />
      </div>
      <div className="info-wrapper">
        <h2 className="username">{user.username}</h2>

        <div className="profile-meta">
          {userProfile.account_type && (
            <p className="profile-type">
              {accountTypeIcons[userProfile.account_type]}{" "}
              {userProfile.account_type}
            </p>
          )}

          <div className="country-div">
            <ReactCountryFlag countryCode={user.country.code2} />
            <p className="country">{user.country.name}</p>
          </div>
        </div>

        {userProfile.bio && <p className="profile-bio">{userProfile.bio}</p>}
      </div>
    </article>
  );
};

export default ProfileCard;
