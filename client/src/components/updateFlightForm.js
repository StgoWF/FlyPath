// src/components/UpdateFlightForm.js
import React, { useState } from 'react';

const UpdateFlightForm = ({ flight, onClose, onSubmit }) => {
  const [formState, setFormState] = useState({
    fromCity: flight.fromCity || '',
    toCity: flight.toCity || '',
    departDate: flight.departDate || '',
    returnDate: flight.returnDate || '',
    travelClass: flight.travelClass || '',
    airlineCode: flight.airlineCode || '',
    flightDuration: flight.flightDuration || '',
    price: flight.price || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      onSubmit(flight._id, formState);
    } catch (error) {
      console.error('Error updating flight:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="fromCity"
        value={formState.fromCity}
        onChange={handleChange}
        placeholder="From City"
      />
      <input
        type="text"
        name="toCity"
        value={formState.toCity}
        onChange={handleChange}
        placeholder="To City"
      />
      <input
        type="date"
        name="departDate"
        value={formState.departDate}
        onChange={handleChange}
      />
      <input
        type="date"
        name="returnDate"
        value={formState.returnDate}
        onChange={handleChange}
      />
      <input
        type="text"
        name="travelClass"
        value={formState.travelClass}
        onChange={handleChange}
        placeholder="Travel Class"
      />
      <input
        type="text"
        name="airlineCode"
        value={formState.airlineCode}
        onChange={handleChange}
        placeholder="Airline Code"
      />
      <input
        type="text"
        name="flightDuration"
        value={formState.flightDuration}
        onChange={handleChange}
        placeholder="Flight Duration"
      />
      <input
        type="number"
        name="price"
        value={formState.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <button type="submit">Update Flight</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default UpdateFlightForm;
