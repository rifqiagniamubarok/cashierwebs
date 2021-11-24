import React from 'react';
import { GoSearch } from 'react-icons/go';

function SearchDashboard() {
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

export default SearchDashboard;
