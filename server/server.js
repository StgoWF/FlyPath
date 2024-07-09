// server/server.js
const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const path = require('path');
const { makeExecutableSchema } = require('@graphql-tools/schema');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use('/graphql', createHandler({
  schema,
  context: authMiddleware,
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`🌍 Now listening on http://localhost:${PORT}`);
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});
