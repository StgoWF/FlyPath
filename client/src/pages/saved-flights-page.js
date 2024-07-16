import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SAVED_FLIGHTS } from '../graphql/queries';
import { DELETE_FLIGHT, UPDATE_FLIGHT } from '../graphql/mutations';
import UpdateFlightForm from '../components/updateFlightForm';
import styles from './SavedFlightsPage.module.css';

const SavedFlightsPage = () => {
  const { loading, error, data } = useQuery(GET_SAVED_FLIGHTS);
  const [deleteFlight] = useMutation(DELETE_FLIGHT, {
    refetchQueries: [{ query: GET_SAVED_FLIGHTS }],
  });
  const [updateFlight] = useMutation(UPDATE_FLIGHT, {
    refetchQueries: [{ query: GET_SAVED_FLIGHTS }],
  });
  const [updatingFlight, setUpdatingFlight] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const flights = data.trips;

  const handleDelete = (id) => {
    deleteFlight({ variables: { id } }).catch((err) => {
      console.error('Error deleting flight:', err);
    });
  };

  const handleUpdate = (flight) => {
    setUpdatingFlight(flight);
  };

  const closeUpdateForm = () => {
    setUpdatingFlight(null);
  };

  const handleSubmitUpdate = (id, input) => {
    updateFlight({ variables: { id, input } })
      .then(() => {
        closeUpdateForm();
      })
      .catch((err) => {
        console.error('Error updating flight:', err);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.savedFlightsContainer}>
        <h1>Saved Flights</h1>
        <ul className={styles.cardFlights}>
          {flights.map((flight) => (
            <li key={flight._id} className={styles.card}>
              <div className={styles.flightInfo}>
                <div className={styles.flightInfoRow}>
                  <span className={styles.flightInfoLabel}>From:</span>
                  <span className={styles.flightInfoValue}>{flight.fromCity}</span>
                </div>
                <div className={styles.flightInfoRow}>
                  <span className={styles.flightInfoLabel}>To:</span>
                  <span className={styles.flightInfoValue}>{flight.toCity}</span>
                </div>
                <div className={styles.flightInfoRow}>
                  <span className={styles.flightInfoLabel}>Departure Date:</span>
                  <span className={styles.flightInfoValue}>{new Date(parseInt(flight.departDate)).toLocaleString()}</span>
                </div>
                <div className={styles.flightInfoRow}>
                  <span className={styles.flightInfoLabel}>Return Date:</span>
                  <span className={styles.flightInfoValue}>{flight.returnDate ? new Date(parseInt(flight.returnDate)).toLocaleString() : 'N/A'}</span>
                </div>
                <div className={styles.flightInfoRow}>
                  <span className={styles.flightInfoLabel}>Class:</span>
                  <span className={styles.flightInfoValue}>{flight.travelClass}</span>
                </div>
                <div className={styles.flightInfoRow}>
                  <span className={styles.flightInfoLabel}>Airline:</span>
                  <span className={styles.flightInfoValue}>{flight.airlineCode}</span>
                </div>
                <div className={styles.flightInfoRow}>
                  <span className={styles.flightInfoLabel}>Duration:</span>
                  <span className={styles.flightInfoValue}>{flight.flightDuration}</span>
                </div>
                <div className={styles.flightInfoRow}>
                  <span className={styles.flightInfoLabel}>Price:</span>
                  <span className={styles.flightInfoValue}>${flight.price}</span>
                </div>
              </div>
              <div className={styles.buttonGroup}>
                <button
                  className={styles.deleteButton}
                  data-id={flight._id}
                  onClick={() => handleDelete(flight._id)}
                >
                  Delete
                </button>
                <button
                  className={styles.updateButton}
                  data-id={flight._id}
                  onClick={() => handleUpdate(flight)}
                >
                  Update
                </button>
              </div>
            </li>
          ))}
        </ul>
        {updatingFlight && (
          <UpdateFlightForm
            flight={updatingFlight}
            onClose={closeUpdateForm}
            onSubmit={handleSubmitUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default SavedFlightsPage;
