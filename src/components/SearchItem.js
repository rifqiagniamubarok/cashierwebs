import React from 'react';
import { GoSearch } from 'react-icons/go';

function SearchItem() {
  return (
    <div className="bingkai-component search-component">
      <form>
        <input placeholder="search" />
        <GoSearch />
        <button type="submit">Seearch</button>
      </form>
    </div>
  );
}

export default SearchItem;
