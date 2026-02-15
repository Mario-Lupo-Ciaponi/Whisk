import { useState, useEffect } from "react";
import SearchBar from "../../components/forms/SearchBar/SearchBar.jsx";
import ProfileSection from "../../components/sections/ProfileSection/ProfileSection.jsx";
import Loader from "../../components/Loader.jsx";
import api from "../../api/api.js";
import "./SearchProfilePage.css";

const SearchProfilePage = ({ currentUser, navigate }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const url = "accounts/user";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(url);

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
      <header className="search-profile-header">
        <h1 className="search-profile-title">Search Profiles</h1>
      </header>

      <div className="search-bar-container">
        <SearchBar url={url} setResult={setUsers} />
      </div>

      {isLoading ? (
        <Loader width={200} height={200} />
      ) : (
        <ProfileSection users={users} navigate={navigate} />
      )}
    </div>
  );
};

export default SearchProfilePage;
