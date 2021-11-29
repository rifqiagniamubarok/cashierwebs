import React from 'react';
import { GoSearch } from 'react-icons/go';

function SearchStock({ searchObject, handleSearchObject }) {
  return (
    <div className="bingkai-component search-component">
      <form>
        <input placeholder="search" value={searchObject} onChange={handleSearchObject} />
        <GoSearch />
        {/* <button type="submit">Search</button> */}
      </form>
    </div>
  );
}

export default SearchStock;
