import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.css";

const SearchBar = ({ onSearch, placeholder }) => {
  const [tempQuery, setTempQuery] = useState("");
  const { t } = useTranslation();

  const handleSubmit = (event) => {
    event.preventDefault();

    onSearch(tempQuery);
  };
  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        value={tempQuery}
        onChange={(event) => {
          setTempQuery(event.target.value);
        }}
        placeholder={placeholder ? placeholder : t("searchBar.placeholder")}
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
