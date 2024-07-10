// src/components/flightCard.js
import React from 'react';

const FlightCard = ({ flight, isReturn, onSave, onDelete, onUpdate }) => {
  const segments = flight.segments[0];

  const price = flight.priceBreakdown.total.units;
  const duration = formatDuration(segments.totalTime);
  const airlineName = segments.legs[0].carriersData[0].name;
  const airlineCode = segments.legs[0].carriersData[0].code;
  const flightDuration = segments.totalTime;
  const layovers = segments.legs[0].flightStops.join(', ');


  return (
    <section className="cardsection">
      <div className="detailsContainer">
        <div className="airlineInfoContainer">
          <div className="airlineCode">{airlineName}</div>
          <div className="layOvers">{`Layovers: ${layovers}`}</div>
        </div>

        <div className="flightDuration">{`Duration: ${duration}`}</div>
        <div className="bookingContainer">
          <div className="airfairprice">{`$ ${price}`}</div>
          <button className="saveButton" onClick={() => {
            // Ensure flight.departureTime, flight.arrivalTime, flight.airlineCode, and flight.flightDuration are correctly assigned from segments
            flight.departureTime = segments.departureTime;
            flight.arrivalTime = segments.arrivalTime;
            flight.airlineCode = airlineCode;
            flight.flightDuration = flightDuration;

            // Verificar si los campos necesarios están presentes
            if (!flight.departureTime) {
              console.error('flight.departureTime is missing or invalid');
              return;
            }
            if (!flight.arrivalTime) {
              console.error('flight.arrivalTime is missing or invalid');
              return;
            }
            if (!flight.airlineCode) {
              console.error('flight.airlineCode is missing or invalid');
              return;
            }
            if (!flight.flightDuration) {
              console.error('flight.flightDuration is missing or invalid');
              return;
            }

            console.log('Passing flight to onSave:', flight);
            onSave(flight);
          }}>Save Flight</button>
        </div>
      </div>
    </section>
  );
};

const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

export default FlightCard;
