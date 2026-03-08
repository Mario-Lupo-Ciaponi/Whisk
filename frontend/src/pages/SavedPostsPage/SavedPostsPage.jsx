import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import PostSection from "../../components/sections/PostSection/PostSection.jsx";
import NoResult from "../../components/NoResult/NoResult.jsx";
import Loader from "../../components/Loader.jsx";
import api from "../../api/api.js";
import "./SavedPostsPage.css";

const SavedPostsPage = ({ currentUser, navigate }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const response = await api.get("posts/saved/");
        setPosts(response.data.results);
      } catch  {
        toast.error(t("errors.somethingWentWrong"));
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchSavedPosts();
  }, []);

  return (
    <>
      <title>{t("savedPosts.title")}</title>

      {isLoading ? (
        <div className="loader-container">
          <Loader width={200} height={200} />
        </div>
      ) : posts.length > 0 ? (
        <>
          <header className="saved-posts-header">
            <h1 className="saved-posts-title">{t("savedPosts.title")}</h1>
          </header>

          <PostSection
            posts={posts}
            currentUser={currentUser}
            navigate={navigate}
          />
        </>
      ) : (
        <NoResult type="post" />
      )}
    </>
  );
};

export default SavedPostsPage;
