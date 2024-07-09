// src/components/SearchPanel.js
import React, { useState } from 'react';

const SearchPanel = () => {
  const [tripType, setTripType] = useState('oneway');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState('economy');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para buscar vuelos
  };

  return (
    <aside className="search-panel">
      <h2 className="search-title">Book a Flight</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="trip-type">Trip Type</label>
          <select id="trip-type" value={tripType} onChange={(e) => setTripType(e.target.value)}>
            <option value="oneway">One-way</option>
            <option value="roundtrip">Roundtrip</option>
            <option value="multicity">Multi-city (coming soon!)</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="from">From</label>
          <input type="text" id="from" value={fromCity} onChange={(e) => setFromCity(e.target.value)} placeholder="Enter departure city" />
        </div>
        <div className="input-group">
          <label htmlFor="to">To</label>
          <input type="text" id="to" value={toCity} onChange={(e) => setToCity(e.target.value)} placeholder="Enter destination city" />
        </div>
        <div className="input-group">
          <label htmlFor="depart-date">Depart Date</label>
          <input type="date" id="depart-date" value={departDate} onChange={(e) => setDepartDate(e.target.value)} />
        </div>
        <div className="input-group" id="return-date-group">
          <label htmlFor="return-date">Return Date</label>
          <input type="date" id="return-date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="passengerDropdown">Passengers</label>
          <div className="passenger-count">
            <label htmlFor="adults">Adults</label>
            <button type="button" onClick={() => setAdults(adults - 1)} disabled={adults <= 1}>-</button>
            <input type="number" id="adults" value={adults} readOnly />
            <button type="button" onClick={() => setAdults(adults + 1)}>+</button>
          </div>
          <div className="passenger-count">
            <label htmlFor="children">Children</label>
            <button type="button" onClick={() => setChildren(children - 1)} disabled={children <= 0}>-</button>
            <input type="number" id="children" value={children} readOnly />
            <button type="button" onClick={() => setChildren(children + 1)}>+</button>
          </div>
          <div className="passenger-count">
            <label htmlFor="infants">Infants</label>
            <button type="button" onClick={() => setInfants(infants - 1)} disabled={infants <= 0}>-</button>
            <input type="number" id="infants" value={infants} readOnly />
            <button type="button" onClick={() => setInfants(infants + 1)}>+</button>
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="class">Class</label>
          <select id="class" value={travelClass} onChange={(e) => setTravelClass(e.target.value)}>
            <option value="economy">Economy</option>
            <option value="premium_economy">Premium Economy</option>
            <option value="business">Business</option>
            <option value="first_class">First Class</option>
          </select>
        </div>
        <button type="submit" className="search-btn">Search Flights</button>
      </form>
    </aside>
  );
};

export default SearchPanel;
