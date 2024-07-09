// src/components/FlightCard.js
import React from 'react';

const FlightCard = ({ flight, isReturn, onSave, onDelete, onUpdate }) => {
  const segments = flight.segments[0];
  const departureAirport = segments.departureAirport.code;
  const arrivalAirport = segments.arrivalAirport.code;
  const price = flight.priceBreakdown.total.units;
  const departureTime = new Date(segments.departureTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const arrivalTime = new Date(segments.arrivalTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const duration = formatDuration(segments.totalTime);
  const airlineName = segments.legs[0].carriersData[0].name;
  const layovers = segments.legs[0].flightStops.join(', ');

  return (
    <section className="cardsection">
      <div className="detailsContainer">
        <div className="airlineInfoContainer">
          <div className="airlineCode">{airlineName}</div>
          <div className="layOvers">{`Layovers: ${layovers}`}</div>
        </div>
        <div className="travelInfoContainer">
          <div className="departAirport">{departureAirport}<br /><span className="time">{departureTime}</span></div>
          <span className="separator">--------------------</span>
          <div className="arrivalAirport">{arrivalAirport}<br /><span className="time">{arrivalTime}</span></div>
        </div>
        <div className="flightDuration">{`Duration: ${duration}`}</div>
        <div className="bookingContainer">
          <div className="airfairprice">{`$ ${price}`}</div>
          <button className="saveButton" onClick={() => onSave(flight)}>Save Flight</button>
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
