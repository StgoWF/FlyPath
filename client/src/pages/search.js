// src/pages/Search.js
import React from 'react';
import SearchPanel from '../components/search-panel';

const Search = () => {
  return (
    <div className="wrapper">
      <SearchPanel />
      <main className="content-panel">
        <div id="resultsContainer"></div>
        {/* Content here */}
      </main>
    </div>
  );
};

export default Search;
