import React from 'react';
import { GoSearch } from 'react-icons/go';

function SearchStock() {
  return (
    <div className="bingkai-component search-component">
      <form>
        <input placeholder="search" />
        <GoSearch />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchStock;
