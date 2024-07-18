// src/components/SearchPanel.js
import React, { useState } from 'react';
import { getAirportIDFromCity, searchFlights } from '../flightAPI';
import FlightCard from './flightCard';  // Ensure this path is correct and matches the file name
import { useMutation } from '@apollo/client';
import { SAVE_FLIGHT } from '../graphql/mutations';
import './SearchPanel.css';

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
  const [flightResults, setFlightResults] = useState([]);
  const [saveFlight] = useMutation(SAVE_FLIGHT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(`Fetching airport ID for departure city: ${fromCity}`);
      const fromId = await getAirportIDFromCity(fromCity);
      console.log(`Fetched airport ID for ${fromCity}: ${fromId}`);

      console.log(`Fetching airport ID for destination city: ${toCity}`);
      const toId = await getAirportIDFromCity(toCity);
      console.log(`Fetched airport ID for ${toCity}: ${toId}`);

      let results;
      if (tripType === 'roundtrip') {
        console.log(`Searching outbound flights from ${fromId} to ${toId} on ${departDate}`);
        const outboundResults = await searchFlights(fromId, toId, departDate);
        console.log('Outbound flight results:', outboundResults);

        console.log(`Searching return flights from ${toId} to ${fromId} on ${returnDate}`);
        const returnResults = await searchFlights(toId, fromId, returnDate);
        console.log('Return flight results:', returnResults);

        results = { outboundResults, returnResults };
      } else {
        console.log(`Searching flights from ${fromId} to ${toId} on ${departDate}`);
        results = await searchFlights(fromId, toId, departDate);
      }

      setFlightResults(results.data ? results.data.flightOffers : []);
    } catch (error) {
      console.error('Error searching flights:', error);
    }
  };

  const handleSave = async (flight) => {
    try {
      console.log('Flight object details:', flight);

      if (!flight.segments || flight.segments.length === 0 || !flight.segments[0].departureAirport || !flight.segments[0].arrivalAirport) {
        throw new Error('Flight object is missing departure or arrival airport');
      }

      const departureAirport = flight.segments[0].departureAirport;
      const arrivalAirport = flight.segments[0].arrivalAirport;

      if (!flight.departureTime) {
        throw new Error('flight.departureTime is missing or invalid');
      }
      if (!flight.airlineCode) {
        throw new Error('flight.airlineCode is missing or invalid');
      }
      if (!flight.flightDuration) {
        throw new Error('flight.flightDuration is missing or invalid');
      }

      const departDate = flight.departureTime;
      const price = parseFloat(flight.priceBreakdown.total.units); // Convert price to float
      const flightDuration = flight.flightDuration.toString(); // Convert duration to string

      console.log('Depart Date:', departDate);
      console.log('Price:', price);

      const input = {
        userId: "668cc73fd31e16e8dd9751ce", // Replace with a valid user ID
        fromCity: departureAirport.code,
        toCity: arrivalAirport.code,
        departDate: departDate,
        returnDate: flight.returnTime || "",
        passengersAdults: 1, // Replace with the corresponding variable
        passengersChildren: 0, // Replace with the corresponding variable
        passengersInfants: 0, // Replace with the corresponding variable
        travelClass: "economy", // Replace with the corresponding variable
        airlineCode: flight.airlineCode,
        flightDuration: flightDuration, // Ensure it's a string
        price: price,
        departTime: flight.departureTime,
        arrivalTime: flight.arrivalTime
      };

      console.log('Saving flight with input:', input);

      await saveFlight({
        variables: { input }
      });

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

  return (
    <aside className="search-panel">
      <h2 className="search-title">Search Flights</h2>
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
            <button type="button" onClick={() => setAdults(adults - 1)} disabled={adults <= 0}>-</button>
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
      <div id="resultsContainer">
        {Array.isArray(flightResults) ? flightResults.map((flight, index) => (
          <FlightCard key={index} flight={flight} isReturn={false} onSave={handleSave} onDelete={() => handleDelete(flight.id)} onUpdate={() => handleUpdate(flight.id)} />
        )) : <p>No flight results found.</p>}
      </div>
    </aside>
  );
};

export default SearchPanel;
