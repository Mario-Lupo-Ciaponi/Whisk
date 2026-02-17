import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PostCard from "../../components/cards/PostCard/PostCard.jsx";
import api from "../../api/api.js";
import "./PostPage.css";
import Loader from "../../components/Loader.jsx";

const PostPage = ({ navigate, currentUser, setIsFilterVisible }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return(
    <div className="post-container">
      {isLoading ?
        <Loader width={300} height={300} /> :
        <PostCard post={post} currentUser={currentUser} setIsFilterVisible={setIsFilterVisible} navigate={navigate} />}
    </div>
  )
}

export default PostPage;