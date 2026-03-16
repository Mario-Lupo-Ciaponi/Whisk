import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Routes, Route, useNavigate } from "react-router";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import CreatePostPage from "./pages/CreatePostPage/CreatePostPage.jsx";
import CreateGroupPage from "./pages/CreateGroupPage/CreateGroupPage.jsx";
import AuthPage from "./pages/AuthPage/AuthPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import PostPage from "./pages/PostPage/PostPage.jsx";
import ContactPage from "./pages/ContactPage/ContactPage.jsx";
import SavedPostsPage from "./pages/SavedPostsPage/SavedPostsPage.jsx";
import SearchProfilePage from "./pages/SearchUserPage/SearchProfilePage.jsx";
import NotificationPage from "./pages/NotificationPage/NotificationPage.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import Loader from "./components/Loader.jsx";
import DarkOpacityFilter from "./components/DarkOpacityFilter/DarkOpacityFilter.jsx";
import api from "./api/api.js";
import "./App.css";

const App = () => {
  const [authTokens, setAuthTokens] = useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const { t } = useTranslation();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      setCurrentUser(null);
      setIsLoading(false);
      return;
    }

    const getCurrentUser = async () => {
      setIsLoading(true);

      try {
        const response = await api.get("accounts/me");
        setCurrentUser(response.data);
      } catch (e) {
        console.error(e);
        setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  return isLoading ? (
    <div className="loader-container app-loader">
      <span className="loading-text">{t("app.pageLoading")}</span>
      <Loader width={175} height={175} />
    </div>
  ) : (
    <>
      <Navbar navigate={navigate} currentUser={currentUser} />
      <main>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route
            index
            element={
              <HomePage
                currentUser={currentUser}
                navigate={navigate}
                setIsFilterVisible={setIsFilterVisible}
                baseUrl={BASE_URL}
              />
            }
          />
          <Route path="about/" element={<AboutPage baseUrl={BASE_URL} />} />
          <Route element={<PrivateRoutes />}>
            <Route
              path="create-post/"
              element={
                <CreatePostPage
                  currentUser={currentUser}
                  navigate={navigate}
                  errors={errors}
                  setErrors={setErrors}
                  baseUrl={BASE_URL}
                />
              }
            />
            <Route
              path="saved-posts/"
              element={
                <SavedPostsPage currentUser={currentUser} baseUrl={BASE_URL} />
              }
            />
            <Route
              path="notifications/"
              element={<NotificationPage baseUrl={BASE_URL} />}
            />
          </Route>
          <Route
            path="login/"
            element={
              <AuthPage
                navigate={navigate}
                setAuthTokens={setAuthTokens}
                errors={errors}
                setErrors={setErrors}
                baseUrl={BASE_URL}
              />
            }
          />
          <Route
            path="profile/:id"
            element={
              <ProfilePage currentUser={currentUser} baseUrl={BASE_URL} />
            }
          />
          <Route
            path="post/:id"
            element={
              <PostPage
                currentUser={currentUser}
                navigate={navigate}
                setIsFilterVisible={setIsFilterVisible}
                baseUrl={BASE_URL}
              />
            }
          />
          <Route
            path="contact/"
            element={
              <ContactPage currentUser={currentUser} baseUrl={BASE_URL} />
            }
          />
          <Route
            path="search-profile/"
            element={
              <SearchProfilePage
                currentUser={currentUser}
                navigate={navigate}
                baseUrl={BASE_URL}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
      {isFilterVisible && <DarkOpacityFilter />}
    </>
  );
};

export default App;
