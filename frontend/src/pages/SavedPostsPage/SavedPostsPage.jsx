import { useState, useEffect } from "react";
import Loader from "../../components/Loader.jsx";
import api from "../../api/api.js";
import "./SavedPostsPage.css";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { Route, Routes } from "react-router";
import NotFound from "../../components/NotFound/NotFound.jsx";
import HomePage from "../HomePage/HomePage.jsx";
import PrivateRoutes from "../../utils/PrivateRoutes.jsx";
import CreatePostPage from "../CreatePostPage/CreatePostPage.jsx";
import CreateGroupPage from "../CreateGroupPage/CreateGroupPage.jsx";
import GroupsPage from "../GroupsPage/GroupsPage.jsx";
import AuthPage from "../AuthPage/AuthPage.jsx";
import ProfilePage from "../ProfilePage/ProfilePage.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import PostSection from "../../components/sections/PostSection/PostSection.jsx";

const SavedPostsPage = ({ currentUser, navigate }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const response = await api.get("posts/saved/");
        setPosts(response.data.results);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchSavedPosts();
  }, []);

  return isLoading ? (
    <Loader width={300} height={300} />
  ) : (
    <>
      <header>
        <h1>Saved posts</h1>
      </header>

      <PostSection
        posts={posts}
        currentUser={currentUser}
        navigate={navigate}
      />
    </>
  );
};

export default SavedPostsPage;
