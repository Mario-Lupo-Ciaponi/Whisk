import "./ProfileCard.css";

const ProfileCard = ({ user }) => {
  const userProfile = user.profile;

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
            <p className="profile-type">{userProfile.account_type}</p>
          )}

          <p className="country">{user.country.name}</p>
        </div>

        {userProfile.bio && <p className="profile-bio">{userProfile.bio}</p>}
      </div>
    </article>
  );
};

export default ProfileCard;
