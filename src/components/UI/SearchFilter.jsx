// SearchFilter.jsx
import React from 'react';

const SearchFilter = ({ search, setSearch, filter, setFilter }) => {
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSelectChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <section className="section-searchFilter container">
      <input
        type="text"
        placeholder="Search by country name"
        value={search || ''}
        onChange={handleInputChange}
      />

      <select
        className="select-section"
        value={filter || 'all'}
        onChange={handleSelectChange}
      >
        <option value="all">All</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </section>
  );
};

export default SearchFilter;