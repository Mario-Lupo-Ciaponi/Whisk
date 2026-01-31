import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import NotFoundImage from "../assets/404-image.png";
import "./NotFound.css";

const NotFound = () => {
  return (
    <article className="not-found">
      <h2 className="title">Oops!</h2>

      <img
        src={NotFoundImage}
        alt="not found image"
        className="not-found-image"
      />

      <Link to="/" className="go-back-to-home">
        <FontAwesomeIcon icon={faHouse} /> Go back to home
      </Link>
    </article>
  );
};

export default NotFound;
