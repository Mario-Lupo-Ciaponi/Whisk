import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faHandshake, faHouse } from "@fortawesome/free-solid-svg-icons";
import "./ProfileCard.css";

const ProfileCard = ({ user, navigate }) => {
  const { t } = useTranslation();

  const userProfile = user.profile;

  const accountTypeIcons = {
    "pet owner": (
      <>
        <FontAwesomeIcon icon={faPaw} /> {t("profileCard.petOwner")}
      </>
    ),
    volunteer: (
      <>
        <FontAwesomeIcon icon={faHandshake} /> {t("profileCard.volunteer")}
      </>
    ),
    shelter: (
      <>
        <FontAwesomeIcon icon={faHouse} /> {t("profileCard.shelter")}
      </>
    ),
  };

  const redirectToProfile = () => navigate(`profile/${user.id}`);

  return (
    <article onClick={redirectToProfile} className="profile-card">
      <div className="profile-card__header">
        <div className="profile-card__image-wrapper">
          <img
            className="profile-card__image"
            src={
              userProfile.profile_image
                ? userProfile.profile_image
                : "images/default-profile-img.jpeg"
            }
            alt="profile image"
          />
        </div>
      </div>

      <div className="profile-card__content">
        <h2 className="profile-card__name">{user.username}</h2>

        {userProfile.account_type && (
          <div
            className={`profile-card__badge profile-card__badge--${userProfile.account_type.replace(" ", "-")}`}
          >
            {accountTypeIcons[userProfile.account_type]}
          </div>
        )}

        <div className="profile-card__location">
          <ReactCountryFlag countryCode={user.country.code2} />
          <p className="profile-card__location-text">{user.country.name}</p>
        </div>

        {userProfile.bio && (
          <p className="profile-card__bio">{userProfile.bio}</p>
        )}
      </div>
    </article>
  );
};

export default ProfileCard;
