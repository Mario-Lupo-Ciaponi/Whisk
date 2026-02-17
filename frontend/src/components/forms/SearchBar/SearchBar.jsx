import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import api from "../../../api/api.js";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [tempQuery, setTempQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    onSearch(tempQuery);
  }
  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        value={tempQuery}
        onChange={(event) => {
          setTempQuery(event.target.value);
        }}
        placeholder="Search..."
        className="input-query"
        type="text"
      />

      <button className="search-btn">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
};

export default SearchBar;
