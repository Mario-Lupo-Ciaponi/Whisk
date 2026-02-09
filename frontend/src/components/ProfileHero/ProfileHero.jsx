import "./ProfileHero.css";

const ProfileHero = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <section className="hero-section">
      <article className="profile-summary">
        <div className="profile-image-container">
          <img
            src={
              currentUser?.image
                ? currentUser.image
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

      <button className="edit-btn">Edit</button>
    </section>
  );
};

export default ProfileHero;
