import express from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";

import typeDefs from "./schema";
import resolvers from "./resolvers";
import { createStore } from "./utils";

import LaunchAPI from "./datasources/launch";
import UserAPI from "./datasources/user";

dotenv.config();

const app = express();

const store = createStore();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store })
  })
});

server.applyMiddleware({ app });

app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}/`);
});
