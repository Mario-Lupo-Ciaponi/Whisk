import { useState, useEffect } from "react";
import ProfileSection from "../../components/sections/ProfileSection/ProfileSection.jsx";
import Loader from "../../components/Loader.jsx";
import api from "../../api/api.js";
import "./SearchProfilePage.css";

const SearchProfilePage = ({ currentUser, navigate }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("accounts/user");

        setUsers(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchUsers();
  }, []);

  return (
    <div className="search-profile-container">
      <header>
        <h1>Search Profiles</h1>
      </header>

      {isLoading ? (
        <Loader width={200} height={200} />
      ) : (
        <ProfileSection users={users} navigate={navigate} />
      )}
    </div>
  );
};

export default SearchProfilePage;
