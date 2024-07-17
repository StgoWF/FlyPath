// src/components/FlightCard.js
import React from 'react';
import styles from './FlightCard.module.css';

const FlightCard = ({ flight, onSave }) => {
  const segments = flight.segments[0];
  const price = flight.priceBreakdown.total.units;
  const duration = formatDuration(segments.totalTime);
  const airlineName = segments.legs[0].carriersData[0].name;
  const departureAirport = segments.departureAirport.code;
  const arrivalAirport = segments.arrivalAirport.code;
  const departureTime = new Date(segments.departureTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const arrivalTime = new Date(segments.arrivalTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const layovers = segments.legs[0].flightStops.join(', ');

  return (
    <section className={styles.cardsection}>
      <div className={styles.detailsContainer}>
        <div className={styles.airlineInfoContainer}>
          <div className={styles.airlineCode}>{airlineName}</div>
          <div className={styles.layOvers}>{`Layovers: ${layovers || 'None'}`}</div>
        </div>
        <div className={styles.travelInfoContainer}>
          <div className={styles.departAirport}>
            {departureAirport}<br /><span className={styles.time}>{departureTime}</span>
          </div>
          <span className={styles.separator}>--------------------</span>
          <div className={styles.arrivalAirport}>
            {arrivalAirport}<br /><span className={styles.time}>{arrivalTime}</span>
          </div>
        </div>
        <div className={styles.flightDuration}>{`Duration: ${duration}`}</div>
      </div>
      <div className={styles.bookingContainer}>
        <div className={styles.airfairprice}>{`$ ${price}`}</div>
        <button
          className={styles.saveButton}
          onClick={() => {
            flight.departureTime = segments.departureTime;
            flight.arrivalTime = segments.arrivalTime;
            flight.airlineCode = airlineName;
            flight.flightDuration = segments.totalTime;

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

            onSave(flight);
          }}
        >
          Save Flight
        </button>
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
