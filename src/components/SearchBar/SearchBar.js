import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ suggestions, onChange, fuzzySearch }) => {
  const [value, setValue] = useState("");

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion);
    setValue(suggestion);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;

    onChange(newValue);
    setValue(newValue);
  };

  const filterSuggestion = (suggestion) => {
    if (fuzzySearch) {
      return (suggestion.toLowerCase().includes(value.toLowerCase()) &&
              suggestion.toLowerCase() !== value.toLowerCase())
    } else {
      return (suggestion.toLowerCase().startsWith(value.toLowerCase()) &&
              suggestion.toLowerCase() !== value.toLowerCase())
    }
  }

  return (
    <div className="searchBar-container">
      <input
        type="text"
        className="searchBar-input"
        value={value}
        onChange={handleChange}
        placeholder="Search..."
      />

      <ul className="searchBar-suggestions">
        {(suggestions.length !== 0 && value.length !== 0) &&
          suggestions
            .filter(filterSuggestion)
            .map((suggestion, index) => (
              <li
                key={index}
                className="searchBar-suggestion"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default SearchBar;
