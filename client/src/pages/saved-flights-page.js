import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SAVED_FLIGHTS } from '../graphql/queries';
import { DELETE_FLIGHT, UPDATE_FLIGHT } from '../graphql/mutations';
import UpdateFlightForm from '../components/updateFlightForm';

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
    <div className="container">
      <div className="saved-flights-container">
        <ul className="cardFlights">
          <div className="card col-6 offset-3">
            <h1>Saved Flights</h1>
            <div className="card-body">
              {flights.map((flight) => (
                <li key={flight._id} className="savedFlights">
                  From {flight.fromCity} to {flight.toCity} <br />
                  Departure Date: {flight.departDate} {flight.departTime} <br />
                  Return Date: {flight.returnDate} <br />
                  Class: {flight.travelClass} <br />
                  Airline: {flight.airlineCode} <br />
                  Duration: {flight.flightDuration} <br />
                  Price: ${flight.price} <br />
                  <button
                    className="delete-button"
                    data-id={flight._id}
                    onClick={() => handleDelete(flight._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="update-button"
                    data-id={flight._id}
                    onClick={() => handleUpdate(flight)}
                  >
                    Update
                  </button>
                  <br />
                </li>
              ))}
            </div>
          </div>
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
