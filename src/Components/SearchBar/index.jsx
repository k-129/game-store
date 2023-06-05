import { useState } from "react";

const SearchBar = ({ getAllGames }) => {
  const [searchString, setSearchString] = useState("");

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchString(query);
    getAllGames(query);
  };

  return (
    <div>
      <h2>Search Games</h2>
      <input
        className="searchBar"
        value={searchString}
        placeholder="Enter search query"
        type="text"
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
