import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ProfileHero from "../../components/ProfileHero/ProfileHero.jsx";
import ProfileForm from "../../components/forms/ProfileForm/ProfileForm.jsx";
import Loader from "../../components/Loader.jsx";
import api from "../../api/api.js";
import "./ProfilePage.css";

const ProfilePage = ({ currentUser }) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [shouldNotEdit, setShouldNotEdit] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      try {
        const response = await api.get(`accounts/user/${id}/`);

        setUser(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (isLoading || !user) {
    return (
      <div className="loader-container">
        <Loader height={200} width={200} />
      </div>
    );
  }

  return (
    <div className="profile">
      <title>{user?.username}</title>

      <ProfileHero
        currentUser={currentUser}
        user={user}
        shouldNotEdit={shouldNotEdit}
        setShouldNotEdit={setShouldNotEdit}
      />
      <ProfileForm user={user} shouldNotEdit={shouldNotEdit} />
    </div>
  );
};

export default ProfilePage;
