import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import cors from "cors";

import { RegisterResolver } from "./resolvers/user";
import { LoginResolver } from "./resolvers/login";

async function main() {
  await createConnection();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RegisterResolver, LoginResolver]
    }),
    context: ({ req }) => ({ req })
  });

  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000"
    })
  );

  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server started on  http://localhost:4000/graphql");
  });
}

main().catch(error => {
  console.log(error);
});
