import {Routes, Route, useNavigate} from "react-router";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx"
import CreatePostPage from "./pages/CreatePostPage.jsx";
import "./styles/reset.css"
import "./styles/typography.css"
import './App.css'
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import {useState} from "react";

function App() {
  const [authTokens, setAuthTokens] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <Navbar navigate={navigate} />
      <main>
          <Routes>
              <Route index element={<HomePage />} />
              <Route path="create-post/" element={<CreatePostPage />} />
              <Route path="register/" element={<RegisterPage navigate={navigate} />} />
              <Route path="login/"  element={<LoginPage setAuthTokens={setAuthTokens} navigate={navigate} />}  />
          </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
