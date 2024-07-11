// src/flightAPI.js
const API_KEY = process.env.REACT_APP_RAPIDAPI_KEY;
const BASE_URL = 'https://booking-com15.p.rapidapi.com/api/v1';

export const getAirportIDFromCity = async (city) => {
  const url = `${BASE_URL}/flights/searchDestination?query=${encodeURIComponent(city)}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.data && data.data.length > 0) {
      return data.data[0].id;
    } else {
      throw new Error('No airport ID found');
    }
  } catch (error) {
    console.error('Error fetching airport ID:', error);
    throw error;
  }
};

export const searchFlights = async (fromId, toId, departDate) => {
  const url = `${BASE_URL}/flights/searchFlights?fromId=${fromId}&toId=${toId}&departDate=${departDate}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching flight data:', error);
    throw error;
  }
};
