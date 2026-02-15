import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import CreatePostPage from "./pages/CreatePostPage/CreatePostPage.jsx";
import GroupsPage from "./pages/GroupsPage/GroupsPage.jsx";
import CreateGroupPage from "./pages/CreateGroupPage/CreateGroupPage.jsx";
import AuthPage from "./pages/AuthPage/AuthPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import ContactPage from "./pages/ContactPage/ContactPage.jsx";
import SavedPostsPage from "./pages/SavedPostsPage/SavedPostsPage.jsx";
import SearchProfilePage from "./pages/SearchUserPage/SearchProfilePage.jsx";
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
  }, [authTokens]);

  return isLoading ? (
    <Loader width={300} height={300} />
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
              />
            }
          />
          <Route element={<PrivateRoutes />}>
            <Route
              path="create-post/"
              element={
                <CreatePostPage
                  currentUser={currentUser}
                  navigate={navigate}
                  errors={errors}
                  setErrors={setErrors}
                />
              }
            />
            <Route
              path="create-group/"
              element={
                <CreateGroupPage
                  navigate={navigate}
                  errors={errors}
                  setErrors={setErrors}
                />
              }
            />
            <Route
              path="saved-posts/"
              element={<SavedPostsPage currentUser={currentUser} />}
            />
          </Route>

          <Route path="groups/" element={<GroupsPage />} />
          <Route
            path="login/"
            element={
              <AuthPage
                navigate={navigate}
                setAuthTokens={setAuthTokens}
                errors={errors}
                setErrors={setErrors}
              />
            }
          />
          <Route
            path="profile/:id"
            element={<ProfilePage currentUser={currentUser} />}
          />
          <Route
            path="contact/"
            element={<ContactPage currentUser={currentUser} />}
          />
          <Route
            path="search-profile"
            element={
              <SearchProfilePage
                currentUser={currentUser}
                navigate={navigate}
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
