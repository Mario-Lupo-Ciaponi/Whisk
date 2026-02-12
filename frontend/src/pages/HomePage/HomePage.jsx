import { useEffect, useState } from "react";
import PostSection from "../../components/sections/PostSection/PostSection.jsx";
import NoResult from "../../components/NoResult/NoResult.jsx";
import api from "../../api/api.js";
import "./HomePage.css";
import PaginationList from "../../components/PaginationList/PaginationList.jsx";
import Loader from "../../components/Loader.jsx";

const HomePage = ({ currentUser, navigate, setIsFilterVisible  }) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 6;

  const getPosts = async () => {
    setIsLoading(true);

    try {
      const response = await api.get("posts/", {
        params: {
          page: currentPage,
        },
      });

      setPosts(response.data.results);
      setTotalPages(Math.ceil(response.data.count / itemsPerPage));
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const filterPosts = async (query) => {
    setIsLoading(true);

    try {
      const response = await api.get("posts/", {
        params: {
          [query]: currentUser.profile[query],
        },
      });

      setPosts(response.data.results);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, [currentPage]);

  const filterFeed = async (event) => {
    const selectValue = event.target.value;

    if (selectValue === "all") await getPosts();
    else await filterPosts(selectValue);
  };

  return (
    <div className="feed">
      <title>Whisk</title>

      <div className="feed-container">
        {currentUser && (
          <select
            onChange={filterFeed}
            name="feed-select"
            className="feed-select"
          >
            <option value="all">All</option>
            <option value="groups">Groups</option>
            {currentUser?.profile.city && <option value="city">City</option>}
          </select>
        )}
      </div>

      {isLoading ? (
        <Loader width={100} height={100} />
      ) : posts.length > 0 ? (
        <>
          <PostSection
            posts={posts}
            currentUser={currentUser}
            navigate={navigate}
            setIsFilterVisible={setIsFilterVisible}
          />

          <PaginationList
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </>
      ) : (
        <NoResult />
      )}
    </div>
  );
};

export default HomePage;
