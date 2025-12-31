import { Routes, Route} from "react-router";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx"
import CreatePostPage from "./pages/CreatePostPage.jsx";
import "./styles/reset.css"
import "./styles/typography.css"
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <main>
          <Routes>
              <Route index element={<HomePage />} />
              <Route path="create-post/" element={<CreatePostPage />} />
          </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
