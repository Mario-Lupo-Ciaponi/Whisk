import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SearchBar from "../../components/forms/SearchBar/SearchBar.jsx";
import ProfileSection from "../../components/sections/ProfileSection/ProfileSection.jsx";
import PaginationList from "../../components/PaginationList/PaginationList.jsx";
import NoResult from "../../components/NoResult/NoResult.jsx";
import Loader from "../../components/Loader.jsx";
import api from "../../api/api.js";
import "./SearchProfilePage.css";

const SearchProfilePage = ({ navigate }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();

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
  };

  return (
    <div className="search-profile-container">
      <title>{t("searchProfile.title")}</title>

      <header className="search-profile-header">
        <h1 className="search-profile-title">{t("searchProfile.title")}</h1>
      </header>

      <div className="search-bar-container">
        <SearchBar onSearch={handleSearch} />
      </div>

      {isLoading ? (
        <div className="loader-container">
          <Loader width={200} height={200} />
        </div>
      ) : users.length > 1 ? (
        <>
          <ProfileSection users={users} navigate={navigate} />

          <div className="paginator-list-container">
            <PaginationList
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        </>
      ) : (
        <NoResult type="user" />
      )}
    </div>
  );
};

export default SearchProfilePage;
