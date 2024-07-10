import { gql } from '@apollo/client';

export const GET_SAVED_FLIGHTS = gql`
  query GetSavedFlights {
    trips {
      _id
      fromCity
      toCity
      departDate
      returnDate
      passengersAdults
      passengersChildren
      passengersInfants
      travelClass
      airlineCode
      flightDuration
      price
      departTime
      arrivalTime
    }
  }
`;