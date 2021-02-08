import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";

import config from "./config";
import { MeResolver } from "./resolvers/me";
import { RegisterResolver } from "./resolvers/register";
import { LoginResolver } from "./resolvers/login";
import { redis } from "./redis";

const main = async () => {
  await createConnection(config);

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [MeResolver, RegisterResolver, LoginResolver]
    }),
    context: ({ req }) => ({ req })
  });

  const RedisStore = connectRedis(session);

  const app = express();

  app.use(
    cors({
      origin: 'http"//localhost:3000',
      credentials: true
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis
      }),
      name: "qid",
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365
      }
    })
  );

  server.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log("Server running on http://localhost:4000/graphql");
  });
};

main().catch(error => {
  console.log(error);
});
