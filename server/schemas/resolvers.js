// server/schemas/resolvers.js
const { AuthenticationError } = require('apollo-server-express');
const User = require('../models/user');
const Trip = require('../models/trip');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { _id }) => {
      return User.findById(_id);
    },
    trips: async () => {
      return Trip.find();
    },
    trip: async (parent, { _id }) => {
      return Trip.findById(_id);
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.checkPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    addTrip: async (parent, args) => {
      const trip = await Trip.create(args);
      return trip;
    },
    saveFlight: async (parent, { input }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      const { userId, price, ...rest } = input;
      const newInput = {
        ...rest,
        userId: context.user._id,
        price: parseFloat(price) // Asegúrate de que el precio es un número flotante
      };

      console.log("Received input for saveFlight mutation:", newInput);

      try {
        const trip = await Trip.create(newInput);
        return trip;
      } catch (error) {
        console.error("Error creating trip:", error);
        throw new Error("Failed to save flight");
      }
    }
  }
};

module.exports = resolvers;
