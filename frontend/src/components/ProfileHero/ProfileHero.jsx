import ProfileImageFileUpload from "../ProfileImageFileUpload/ProfileImageFileUpload.jsx";
import api from "../../api/api.js";
import "./ProfileHero.css";

const ProfileHero = ({
  currentUser,
  user,
  shouldNotEdit,
  setShouldNotEdit,
}) => {
  const toggleShouldNotEdit = () => setShouldNotEdit(!shouldNotEdit);

  return (
    <section className="hero-section">
      <article className="profile-summary">
        <div className="profile-image-container">
          <img
            src={
              user.profile.profile_image
                ? user.profile.profile_image
                : "images/default-profile-img.jpeg"
            }
            alt="profile image"
            className="profile-image"
          />

          {currentUser.id === user.id && <ProfileImageFileUpload user={user} />}
        </div>

        <div className="name-wrapper">
          <h2 className="username">{user.username}</h2>
          <p className="email">{user.email}</p>
        </div>
      </article>

      {currentUser.id === user.id && (
        <button onClick={toggleShouldNotEdit} className="edit-btn">
          {shouldNotEdit ? "Edit" : "Stop Edit"}
        </button>
      )}
    </section>
  );
};

export default ProfileHero;
