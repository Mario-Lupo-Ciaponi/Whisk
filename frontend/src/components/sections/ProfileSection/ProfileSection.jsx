import ProfileCard from "../../cards/ProfileCard/ProfileCard.jsx";
import "./ProfileSection.css";

const ProfileSection = ({ users, navigate }) => {
  return (
    <section className="profile-section">
      {users.map((user) => {
        return <ProfileCard user={user} navigate={navigate} />;
      })}
    </section>
  );
};

export default ProfileSection;
