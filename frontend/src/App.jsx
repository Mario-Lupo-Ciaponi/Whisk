import {useState} from "react";
import {Routes, Route, useNavigate} from "react-router";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx"
import CreatePostPage from "./pages/CreatePostPage.jsx";
import GroupsPage from "./pages/GroupsPage.jsx";
import CreateGroupPage from "./pages/CreateGroupPage.jsx";
import "./styles/reset.css"
import "./styles/typography.css"
import './App.css'
import AuthPage from "./pages/AuthPage.jsx";

function App() {
  const [authTokens, setAuthTokens] = useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  return (
    <>
      <Navbar navigate={navigate} />
      <main>
          <Routes>
              <Route index element={<HomePage />} />
              <Route element={<PrivateRoutes />}>
                  <Route
                      path="create-post/"
                      element={<CreatePostPage  navigate={navigate} errors={errors} setErrors={setErrors} />}
                  />
                  <Route
                      path="create-group/"
                      element={<CreateGroupPage navigate={navigate()} errors={errors} setErrors={setErrors} />}
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

export default App
