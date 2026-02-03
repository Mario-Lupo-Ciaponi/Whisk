import {useEffect, useState} from "react";
import {Routes, Route, useNavigate} from "react-router";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx"
import CreatePostPage from "./pages/CreatePostPage.jsx";
import GroupsPage from "./pages/GroupsPage.jsx";
import CreateGroupPage from "./pages/CreateGroupPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import NotFound from "./components/NotFound.jsx";
import api from "./api/api.js";
import './App.css'

const App = () => {
  const [authTokens, setAuthTokens] = useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const getCurrentUser = async () => {
            const response = await api.get("accounts/me");
            setCurrentUser(response.data);
        }

        if (localStorage.getItem("access"))
            getCurrentUser();
    }, []);

  return (
    <>
      <Navbar navigate={navigate} currentUser={currentUser} />
      <main>
          <Routes>
              <Route path="*" element={<NotFound />} />
              <Route index element={<HomePage currentUser={currentUser} navigate={navigate} />} />
              <Route element={<PrivateRoutes />}>
                  <Route
                      path="create-post/"
                      element={
                          <CreatePostPage
                              currentUser={currentUser}
                              navigate={navigate}
                              errors={errors}
                              setErrors={setErrors}
                          />}
                  />
                  <Route
                      path="create-group/"
                      element={<CreateGroupPage navigate={navigate} errors={errors} setErrors={setErrors} />}
                  />
              </Route>

              <Route path="groups/" element={<GroupsPage  />}/>
              <Route
                  path="login/"
                  element=
                      {<AuthPage
                          navigate={navigate}
                          setAuthTokens={setAuthTokens}
                          errors={errors}
                          setErrors={setErrors}/>
                      }
              />
          </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App;
