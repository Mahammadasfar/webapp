


import React, { useEffect, useState, useTransition } from 'react';
import { getcountryData } from '../api/postApi';
import { CountryCard } from '../components/Layout/Country.card';


const Country = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc'); // New state for sorting
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  console.log(search);

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await getcountryData();
        setCountries(res.data);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      }
    });
  }, []);

  const filteredCountries = countries.filter(({ name, region }) =>
    name.common.toLowerCase().includes(search.toLowerCase()) &&
    (filter === 'all' || region === filter)
  );

  // Sorting logic based on sortOrder
  const sortedCountries = [...filteredCountries].sort((a, b) => {
    const nameA = a.name.common.toLowerCase();
    const nameB = b.name.common.toLowerCase();
    if (sortOrder === 'asc') {
      return nameA > nameB ? 1 : -1;
    } else {
      return nameA < nameB ? 1 : -1;
    }
  });

  return (
    <section className="country-section container">
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="section-searchFilter">
        <input
          type="text"
          placeholder="Search by country name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          {['all', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].map(region => (
            <option value={region} key={region}>{region}</option>
          ))}
        </select>

        {/* Sorting dropdown */}
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <ul className="grid grid-four-cols">
        {sortedCountries.map((country) => (
          <CountryCard country={country} key={country.cca3 || country.name.common} />
        ))}
      </ul>
    </section>
  );
};

export default Country;

