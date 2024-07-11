const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
  }

  type Trip {
    _id: ID
    userId: ID
    fromCity: String
    toCity: String
    departDate: String
    returnDate: String
    passengersAdults: Int
    passengersChildren: Int
    passengersInfants: Int
    travelClass: String
    airlineCode: String
    flightDuration: String
    price: Float
    departTime: String
    arrivalTime: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    trips: [Trip]
    trip(_id: ID!): Trip
  }

  input SaveFlightInput {
    userId: ID!
    fromCity: String!
    toCity: String!
    departDate: String!
    returnDate: String
    passengersAdults: Int!
    passengersChildren: Int
    passengersInfants: Int
    travelClass: String!
    airlineCode: String!
    flightDuration: String!
    price: Float!
    departTime: String!
    arrivalTime: String!
  }

  input UpdateFlightInput {
    fromCity: String
    toCity: String
    departDate: String
    returnDate: String
    travelClass: String
    airlineCode: String
    flightDuration: String
    price: Float
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addTrip(
      userId: ID!,
      fromCity: String!,
      toCity: String!,
      departDate: String!,
      returnDate: String,
      passengersAdults: Int!,
      passengersChildren: Int,
      passengersInfants: Int,
      travelClass: String!,
      airlineCode: String,
      flightDuration: String,
      price: Float,
      departTime: String,
      arrivalTime: String
    ): Trip
    saveFlight(input: SaveFlightInput!): Trip
    deleteFlight(id: ID!): Trip
    updateFlight(id: ID!, input: UpdateFlightInput!): Trip
  }
`;

module.exports = typeDefs;
