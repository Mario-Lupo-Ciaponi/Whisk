import { useState } from "react";
import ProfileHero from "../../components/ProfileHero/ProfileHero.jsx";
import ProfileForm from "../../components/forms/ProfileForm/ProfileForm.jsx";
import Loader from "../../components/Loader.jsx";
import "./ProfilePage.css";

const ProfilePage = ({ currentUser }) => {
  const [shouldNotEdit, setShouldNotEdit] = useState(true);

  return currentUser ? (
    <div className="profile">
      <ProfileHero
        currentUser={currentUser}
        shouldNotEdit={shouldNotEdit}
        setShouldNotEdit={setShouldNotEdit}
      />
      <ProfileForm currentUser={currentUser} shouldNotEdit={shouldNotEdit} />
    </div>
  ) : (
    <Loader height={100} width={100} />
  );
};

export default ProfilePage;
