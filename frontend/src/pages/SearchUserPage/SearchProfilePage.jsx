import { useState, useEffect } from "react";
import SearchBar from "../../components/forms/SearchBar/SearchBar.jsx";
import ProfileSection from "../../components/sections/ProfileSection/ProfileSection.jsx";
import Loader from "../../components/Loader.jsx";
import api from "../../api/api.js";
import "./SearchProfilePage.css";
import PaginationList from "../../components/PaginationList/PaginationList.jsx";

const SearchProfilePage = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 9;

  const url = "accounts/user";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(url, {
          params: {
            page: currentPage,
            search: searchQuery,
          },
        });

        setUsers(response.data.results);
        setTotalPages(Math.ceil(response.data.count / itemsPerPage));
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchUsers();
  }, [currentPage, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }

  return (
    <div className="search-profile-container">
      <header className="search-profile-header">
        <h1 className="search-profile-title">Search Profiles</h1>
      </header>

      <div className="search-bar-container">
        <SearchBar onSearch={handleSearch} />
      </div>

      {isLoading ? (
        <Loader width={200} height={200} />
      ) : (
        <>
          <ProfileSection users={users} />

          <div className="paginator-list-container">
            <PaginationList
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchProfilePage;
