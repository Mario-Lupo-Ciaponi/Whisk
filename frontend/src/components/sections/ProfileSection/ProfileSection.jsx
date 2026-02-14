import ProfileCard from "../../cards/ProfileCard/ProfileCard.jsx";
import "./ProfileSection.css";

const ProfileSection = ({ users }) => {
  return (
    <section className="profile-section">
      {users.map(user => {
        return <ProfileCard user={user} />;
      })}
    </section>
  )
};

export default ProfileSection;
