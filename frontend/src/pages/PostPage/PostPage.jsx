import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { Helmet } from "react-helmet-async";
import PostCard from "../../components/cards/PostCard/PostCard.jsx";
import api from "../../api/api.js";
import "./PostPage.css";
import Loader from "../../components/Loader.jsx";

const PostPage = ({ navigate, currentUser, setIsFilterVisible, baseUrl }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  const pageTitle = post.title;
  const pageUrl = `${baseUrl}${location.pathname}`;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`posts/${id}`);

        setPost(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:url" content={pageUrl} />
      </Helmet>
      <div className="post-container">
        {isLoading ? (
          <Loader width={300} height={300} />
        ) : (
          <PostCard
            post={post}
            currentUser={currentUser}
            setIsFilterVisible={setIsFilterVisible}
            navigate={navigate}
          />
        )}
      </div>
    </>
  );
};

export default PostPage;
