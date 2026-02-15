import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import api from "../../../api/api.js";
import "./SearchBar.css";

const SearchBar = ({ url, setResult }) => {
  const [query, setQuery] = useState("");

  const searchResults = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const response = await api.get(url, {
        params: {
          search: query,
        },
      });

      setResult(response.data);
      setQuery("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={searchResults} className="search-bar">
      <input
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
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
