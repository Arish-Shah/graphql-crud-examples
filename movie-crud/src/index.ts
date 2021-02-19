import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { MovieResolver } from "./resolvers/movie";

const main = async () => {
  await createConnection();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, MovieResolver],
    }),
  });

  const app = express();
  server.applyMiddleware({ app, cors: false });
  app.listen(4000, () => {
    console.log("Server started");
  });
};

main().catch(console.error);
