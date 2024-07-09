// server/schemas/typeDefs.js
const { gql } = require('graphql-tag');

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

  type Mutation {
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addTrip(userId: ID!, fromCity: String!, toCity: String!, departDate: String!, returnDate: String, passengersAdults: Int!, passengersChildren: Int, passengersInfants: Int, travelClass: String!, airlineCode: String, flightDuration: String, price: Float, departTime: String, arrivalTime: String): Trip
  }
`;

module.exports = typeDefs;
