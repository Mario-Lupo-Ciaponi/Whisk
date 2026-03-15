import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Toaster } from "react-hot-toast";
import PostSection from "../../components/sections/PostSection/PostSection.jsx";
import NoResult from "../../components/NoResult/NoResult.jsx";
import api from "../../api/api.js";
import "./HomePage.css";
import PaginationList from "../../components/PaginationList/PaginationList.jsx";
import Loader from "../../components/Loader.jsx";

const HomePage = ({ currentUser, navigate, setIsFilterVisible }) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { t, i18n } = useTranslation();

  const itemsPerPage = 6;

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
    const getPosts = async () => {
      setIsLoading(true);

      try {
        const response = await api.get("posts/", {
          params: {
            page: currentPage,
            lang: i18n.language,
          },
        });

        console.log(response.data);

        setPosts(response.data.results);
        setTotalPages(Math.ceil(response.data.count / itemsPerPage));
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

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
      <Toaster position="top-center" />

      {isLoading ? (
        <Loader width={200} height={200} />
      ) : posts.length > 0 ? (
        <>
          <div className="feed-container">
            {currentUser && (
              <select
                onChange={filterFeed}
                name="feed-select"
                className="feed-select"
              >
                <option value="all">{t("homepage.feedSelect.all")}</option>
                {currentUser?.profile.city && (
                  <option value="city">{t("homepage.feedSelect.city")}</option>
                )}
              </select>
            )}
          </div>

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
        <NoResult type="post" />
      )}
    </div>
  );
};

export default HomePage;
