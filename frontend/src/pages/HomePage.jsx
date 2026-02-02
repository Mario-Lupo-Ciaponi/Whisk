import { useEffect, useState } from "react";
import PostSection from "../components/sections/PostSection.jsx";
import NoResult from "../components/NoResult.jsx";
import api from "../api/api.js";
import "./HomePage.css";
import PaginationList from "../components/PaginationList.jsx";

const HomePage = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const itemsPerPage = 2;

  // NOTE: This is purely for test purposes, and it will change to check the real users city and groups!
  const userInfo = {
    city: "Vratsa",
  };

  const getPosts = async () => {
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
  };

  const filterPosts = async (query) => {
    try {
      const response = await api.get("posts/", {
        params: {
          [query]: userInfo[query],
        },
      });

      setPosts(response.data.results);
    } catch (error) {
      console.log(error);
    }
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
        <select
          onChange={filterFeed}
          name="feed-select"
          className="feed-select"
        >
          <option value="all">All</option>
          <option value="groups">Groups</option>
          <option value="city">City</option>
        </select>
      </div>

      {posts.length ? (
        <PostSection posts={posts} currentUser={currentUser} />
      ) : (
        <NoResult />
      )}

      <PaginationList
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default HomePage;
