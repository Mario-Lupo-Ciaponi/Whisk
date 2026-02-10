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
              currentUser.profile.profile_image
                ? currentUser.profile.profile_image
                : "images/default-profile-img.jpeg"
            }
            alt="profile image"
            className="profile-image"
          />
        </div>

        <div className="name-wrapper">
          <h2 className="username">{currentUser.username}</h2>
          <p className="email">{currentUser.email}</p>
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
