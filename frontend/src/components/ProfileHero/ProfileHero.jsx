import { useTranslation } from "react-i18next";
import ProfileImageFileUpload from "../ProfileImageFileUpload/ProfileImageFileUpload.jsx";
import api from "../../api/api.js";
import "./ProfileHero.css";

const ProfileHero = ({
  currentUser,
  user,
  shouldNotEdit,
  setShouldNotEdit,
}) => {
  const { t } = useTranslation();

  const toggleShouldNotEdit = () => setShouldNotEdit(!shouldNotEdit);

  return (
    <section className="profile-hero">
      <article className="profile-hero__summary">
        <div className="profile-hero__avatar-wrap">
          <img
            src={
              user.profile.profile_image
                ? user.profile.profile_image
                : "images/default-profile-img.jpeg"
            }
            alt="profile image"
            className="profile-hero__avatar"
          />

          {currentUser?.id === user.id && (
            <ProfileImageFileUpload user={user} />
          )}
        </div>

        <div className="profile-hero__meta">
          <h2 className="profile-hero__name">{user.username}</h2>
          <p className="profile-hero__email">{user.email}</p>
        </div>
      </article>

      {currentUser?.id === user.id && (
        <button
          type="button"
          onClick={toggleShouldNotEdit}
          className="profile-hero__edit"
        >
          {shouldNotEdit ? t("profileHero.edit") : t("profileHero.stopEdit")}
        </button>
      )}
    </section>
  );
};

export default ProfileHero;
