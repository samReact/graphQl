import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import sqlite from 'sqlite';

import { resolvers, typeDefs } from './schema';

const PORT = process.env.PORT || 3001;
const app = express();

sqlite.open('./db.sqlite').then(db => {
  global.db = db;
  new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
  }).applyMiddleware({ app });
  app.listen(PORT, () => `Listening at http://localhost:${PORT}`);
});
