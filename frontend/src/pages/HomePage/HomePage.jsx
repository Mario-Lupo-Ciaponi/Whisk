import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import toast, { Toaster } from "react-hot-toast";
import StatusFilter from "../../components/StatusFilter/StatusFilter.jsx";
import PostSection from "../../components/sections/PostSection/PostSection.jsx";
import NoResult from "../../components/NoResult/NoResult.jsx";
import api from "../../api/api.js";
import PaginationList from "../../components/PaginationList/PaginationList.jsx";
import Loader from "../../components/Loader.jsx";
import "./HomePage.css";

const HomePage = ({ currentUser, navigate, setIsFilterVisible, baseUrl }) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  const pageTitle = "Whisk";

  const itemsPerPage = 6;

  const onChangeStatus = (event) => setSelectedStatus(event.target.value);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);

      try {
        const response = await api.get("posts/", {
          params: {
            found: selectedStatus,
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

    getPosts();
  }, [currentPage, selectedStatus]);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          property="og:title"
          content={`${pageTitle} - ${t("homepage.title")}`}
        />
        <meta property="og:url" content={baseUrl} />
      </Helmet>
      <div className="feed">
        <Toaster position="top-center" />

        {isLoading ? (
          <Loader width={200} height={200} />
        ) : posts.length > 0 ? (
          <>
            <header className="home-header">
              <h1 className="title">{t("homepage.heading")}</h1>
              <StatusFilter selectedStatus={selectedStatus} onStatusChange={onChangeStatus} />
            </header>

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
    </>
  );
};

export default HomePage;
