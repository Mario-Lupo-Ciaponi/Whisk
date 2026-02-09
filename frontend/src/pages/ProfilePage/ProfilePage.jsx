import ProfileHero from "../../components/ProfileHero/ProfileHero.jsx";
import "./ProfilePage.css";
import Loader from "../../components/Loader.jsx";

const ProfilePage = ({ currentUser }) => {
  return currentUser ? (
    <div className="profile">
      <ProfileHero currentUser={currentUser} />
    </div>
  ) : (
    <Loader height={100} width={100} />
  );
};

export default ProfilePage;
