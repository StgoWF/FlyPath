// src/pages/SavedFlightsPage.js
import React from 'react';

const SavedFlightsPage = () => {
  // Suponiendo que "flights" es un estado o prop con los vuelos guardados
  const flights = [];

  return (
    <div className="container">
      <div className="saved-flights-container">
        <ul className="cardFlights">
          <div className="card col-6 offset-3">
            <h1>Saved Flights</h1>
            <div className="card-body">
              {flights.map(flight => (
                <li key={flight.id} className="savedFlights">
                  From {flight.fromCity} to {flight.toCity} <br />
                  Departure Date: {flight.departDate} {flight.departureTime} <br />
                  Return Date: {flight.returnDate} <br />
                  Class: {flight.travelClass} <br />
                  Airline: {flight.airlineCode} <br />
                  Duration: {flight.flightDuration} <br />
                  Price: ${flight.price} <br />
                  <button className="delete-button" data-id={flight.id}>Delete</button>
                  <button className="update-button" data-id={flight.id}>Update</button> <br />
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
