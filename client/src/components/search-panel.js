//src/components/search-panel.js
import React, { useState, useEffect, useRef } from 'react';
import styles from './SearchPanel.module.css'; 
import { getAirportIDFromCity, searchFlights } from '../flightAPI';
import FlightCard from './flightCard';
import { useMutation } from '@apollo/client';
import { SAVE_FLIGHT } from '../graphql/mutations';
import "./search.css";

const SearchPanel = ({ onSearch }) => {
  const [tripType, setTripType] = useState('oneway');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState('economy');
  const [flightResults, setFlightResults] = useState([]);
  const [saveFlight] = useMutation(SAVE_FLIGHT);

  const passengerDropdownRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fromId = await getAirportIDFromCity(fromCity);
      const toId = await getAirportIDFromCity(toCity);

      let results;
      if (tripType === 'roundtrip') {
        const outboundResults = await searchFlights(fromId, toId, departDate);
        const returnResults = await searchFlights(toId, fromId, returnDate);
        results = { outboundResults, returnResults };
      } else {
        results = await searchFlights(fromId, toId, departDate);
      }

      setFlightResults(results.data ? results.data.flightOffers : []);
    } catch (error) {
      console.error('Error searching flights:', error);
    }
  };

  const handleSave = async (flight) => {
    try {
      const departureAirport = flight.segments[0].departureAirport;
      const arrivalAirport = flight.segments[0].arrivalAirport;

      const departDate = flight.departureTime;
      const price = parseFloat(flight.priceBreakdown.total.units);
      const flightDuration = flight.flightDuration.toString();

      const input = {
        userId: "668cc73fd31e16e8dd9751ce",
        fromCity: departureAirport.code,
        toCity: arrivalAirport.code,
        departDate: departDate,
        returnDate: flight.returnTime || "",
        passengersAdults: adults,
        passengersChildren: children,
        passengersInfants: infants,
        travelClass: travelClass,
        airlineCode: flight.airlineCode,
        flightDuration: flightDuration,
        price: price,
        departTime: flight.departureTime,
        arrivalTime: flight.arrivalTime
      };

      await saveFlight({ variables: { input } });
      alert('Flight saved successfully!');
    } catch (error) {
      console.error('Error saving flight:', error);
      alert('Failed to save flight');
    }
  };

  const handleDelete = (id) => {
    console.log(`Delete flight with id: ${id}`);
  };

  const handleUpdate = (id) => {
    console.log(`Update flight with id: ${id}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (passengerDropdownRef.current && !passengerDropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (event) => {
    event.stopPropagation();
    const dropdown = document.getElementById('passengerDropdownContent');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  };

  const closeDropdown = () => {
    const dropdown = document.getElementById('passengerDropdownContent');
    if (dropdown) {
      dropdown.style.display = 'none';
    }
  };

  return (
    <aside className={styles.searchPanel}>
      <h2 className={styles.searchTitle}>Book a Flight</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
        <div className={styles.inputGroup}>
          <label htmlFor="trip-type">Trip Type</label>
          <select id="trip-type" value={tripType} onChange={(e) => setTripType(e.target.value)}>
            <option value="oneway">One-way</option>
            <option value="roundtrip">Roundtrip</option>
            <option value="multicity">Multi-city (coming soon!)</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="from">From</label>
          <input type="text" id="from" value={fromCity} onChange={(e) => setFromCity(e.target.value)} placeholder="Enter departure city" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="to">To</label>
          <input type="text" id="to" value={toCity} onChange={(e) => setToCity(e.target.value)} placeholder="Enter destination city" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="depart-date">Depart Date</label>
          <input type="date" id="depart-date" value={departDate} onChange={(e) => setDepartDate(e.target.value)} />
        </div>
        {tripType === 'roundtrip' && (
          <div className={styles.inputGroup} id="return-date-group">
            <label htmlFor="return-date">Return Date</label>
            <input type="date" id="return-date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
          </div>
        )}
        <div className={styles.inputGroup} ref={passengerDropdownRef}>
          <label htmlFor="passengerDropdown">Passengers</label>
          <button type="button" id="passengerDropdown" className="passenger-btn" onClick={toggleDropdown}>
            Select Passengers
          </button>
          <div className="passenger-dropdown-content" id="passengerDropdownContent" style={{ display: 'none' }}>
            <div className="passenger-count">
              <label htmlFor="adults">Adults</label>
              <button type="button" className="quantity-btn decrease" onClick={() => setAdults(adults > 1 ? adults - 1 : 1)}>-</button>
              <input type="number" id="adults" value={adults} min="1" readOnly />
              <button type="button" className="quantity-btn increase" onClick={() => setAdults(adults + 1)}>+</button>
            </div>
            <div className="passenger-count">
              <label htmlFor="children">Children</label>
              <button type="button" className="quantity-btn decrease" onClick={() => setChildren(children > 0 ? children - 1 : 0)}>-</button>
              <input type="number" id="children" value={children} min="0" readOnly />
              <button type="button" className="quantity-btn increase" onClick={() => setChildren(children + 1)}>+</button>
            </div>
            <div className="passenger-count">
              <label htmlFor="infants">Infants</label>
              <button type="button" className="quantity-btn decrease" onClick={() => setInfants(infants > 0 ? infants - 1 : 0)}>-</button>
              <input type="number" id="infants" value={infants} min="0" readOnly />
              <button type="button" className="quantity-btn increase" onClick={() => setInfants(infants + 1)}>+</button>
            </div>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="class">Class</label>
          <select id="class" value={travelClass} onChange={(e) => setTravelClass(e.target.value)}>
            <option value="economy">Economy</option>
            <option value="premium_economy">Premium Economy</option>
            <option value="business">Business</option>
            <option value="first_class">First Class</option>
          </select>
        </div>
        <button type="submit" className={styles.searchBtn}>Search Flights</button>
      </form>
    <div className="content" id="resultsContainer">
    {Array.isArray(flightResults) ? flightResults.map((flight, index) => (
      <FlightCard key={index} flight={flight} isReturn={false} onSave={handleSave} onDelete={() => handleDelete(flight.id)} onUpdate={() => handleUpdate(flight.id)} />
    )) : <p>No flight results found.</p>}
    </div>
  </aside>

  );
};

export default SearchPanel;
