// src/pages/SavedFlightsPage.js
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SAVED_FLIGHTS } from '../graphql/queries';

const SavedFlightsPage = () => {
  const { loading, error, data } = useQuery(GET_SAVED_FLIGHTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const flights = data.trips;

  return (
    <div className="container">
      <div className="saved-flights-container">
        <ul className="cardFlights">
          <div className="card col-6 offset-3">
            <h1>Saved Flights</h1>
            <div className="card-body">
              {flights.map(flight => (
                <li key={flight._id} className="savedFlights">
                  From {flight.fromCity} to {flight.toCity} <br />
                  Departure Date: {flight.departDate} {flight.departTime} <br />
                  Return Date: {flight.returnDate} <br />
                  Class: {flight.travelClass} <br />
                  Airline: {flight.airlineCode} <br />
                  Duration: {flight.flightDuration} <br />
                  Price: ${flight.price} <br />
                  <button className="delete-button" data-id={flight._id}>Delete</button>
                  <button className="update-button" data-id={flight._id}>Update</button> <br />
                </li>
              ))}
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default SavedFlightsPage;
