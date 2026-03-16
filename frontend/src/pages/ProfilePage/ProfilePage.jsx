import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { Helmet } from "react-helmet-async";
import ProfileHero from "../../components/ProfileHero/ProfileHero.jsx";
import ProfileForm from "../../components/forms/ProfileForm/ProfileForm.jsx";
import Loader from "../../components/Loader.jsx";
import api from "../../api/api.js";
import "./ProfilePage.css";

const ProfilePage = ({ currentUser, baseUrl }) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [shouldNotEdit, setShouldNotEdit] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const pageTitle = user?.username ? user?.username : "Profile";
  const pageUrl = `${baseUrl}${location.pathname}`;

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
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:url" content={pageUrl} />
      </Helmet>
      <div className="profile">
        <ProfileHero
          currentUser={currentUser}
          user={user}
          shouldNotEdit={shouldNotEdit}
          setShouldNotEdit={setShouldNotEdit}
        />
        <ProfileForm user={user} shouldNotEdit={shouldNotEdit} />
      </div>
    </>
  );
};

export default ProfilePage;
