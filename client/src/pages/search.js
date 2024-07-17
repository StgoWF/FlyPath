// src/pages/search.js
// src/pages/Search.js
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_FLIGHTS } from '../graphql/mutations';
import SearchPanel from '../components/SearchPanel';

const Search = () => {
  const { loading, error, data, refetch } = useQuery(GET_FLIGHTS, {
    skip: true, // No ejecutar la consulta al cargar el componente
  });

  const handleSearch = (searchParams) => {
    refetch(searchParams);
  };

  return (
    <div className="wrapper">
      <SearchPanel onSearch={handleSearch} />
      <main className="content-panel">
        <div id="resultsContainer">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data && data.flights.map((flight) => (
            <div key={flight.id}>
              <p>{flight.fromCity} to {flight.toCity}</p>
              <p>Departure Date: {flight.departDate}</p>
              <p>Return Date: {flight.returnDate}</p>
              <p>Class: {flight.travelClass}</p>
              <p>Airline: {flight.airlineCode}</p>
              <p>Duration: {flight.flightDuration}</p>
              <p>Price: ${flight.price}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Search;
