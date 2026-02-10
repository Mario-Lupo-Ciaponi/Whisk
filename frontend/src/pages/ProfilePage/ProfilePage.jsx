import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ProfileHero from "../../components/ProfileHero/ProfileHero.jsx";
import ProfileForm from "../../components/forms/ProfileForm/ProfileForm.jsx";
import Loader from "../../components/Loader.jsx";
import "./ProfilePage.css";

const ProfilePage = ({ currentUser }) => {
  const id = useParams();
  const user = useState({});
  const [shouldNotEdit, setShouldNotEdit] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {};
  }, []);

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
