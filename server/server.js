const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const path = require('path');
require('dotenv').config();

const app = express();  // Initialize app here

const stripeRoutes = require('./routes/stripe');  // Import Stripe routes

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => authMiddleware({ req }),
  introspection: true,
  playground: true,
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Use Stripe routes after initializing app and before production setup
  app.use('/api/stripe', stripeRoutes);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
  }

  mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('🌍 Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  }).catch(err => {
    console.error('Error connecting to MongoDB', err);
  });
}

startServer();
