import { useState } from "react";
import "./SeeMore.css";

const SeeMore = ({ text, maxLength = 150 }) => {
  const [isExanded, setIsExanded] = useState(false);

  const toggleIsExanded = () => setIsExanded(!isExanded);

  if (text.length <= maxLength) return <p>{text}</p>;

  return (
    <p className="see-more">
      <span className="text">
        {isExanded ? text : text.slice(0, maxLength) + "..."}
      </span>
      <button className="see-more__button" onClick={toggleIsExanded}>
        {isExanded ? "See Less" : "See More"}
      </button>
    </p>
  );
};

export default SeeMore;
