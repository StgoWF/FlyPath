import { gql } from '@apollo/client';

export const SAVE_FLIGHT = gql`
  mutation SaveFlight($input: SaveFlightInput!) {
    saveFlight(input: $input) {
      _id
      userId
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

export const SIGNUP_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const GET_FLIGHTS = gql`
  query GetFlights($fromCity: String!, $toCity: String!, $departDate: String!, $returnDate: String) {
    flights(fromCity: $fromCity, toCity: $toCity, departDate: $departDate, returnDate: $returnDate) {
      id
      fromCity
      toCity
      departDate
      returnDate
      travelClass
      airlineCode
      flightDuration
      price
    }
  }
`;





export const DELETE_FLIGHT = gql`
  mutation deleteFlight($id: ID!) {
    deleteFlight(id: $id) {
      _id
    }
  }
`;

export const UPDATE_FLIGHT = gql`
  mutation updateFlight($id: ID!, $input: UpdateFlightInput!) {
    updateFlight(id: $id, input: $input) {
      _id
      fromCity
      toCity
      departDate
      returnDate
      travelClass
      airlineCode
      flightDuration
      price
    }
  }
`;
