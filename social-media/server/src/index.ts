import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import dotenv from "dotenv";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";

import { UserResolver } from "./resolvers/user";
import { TweetResolver } from "./resolvers/tweet";
import { ReplyResolver } from "./resolvers/reply";
import { createUserLoader } from "./util/createUserLoader";

dotenv.config();

const main = async () => {
  const PORT = process.env.PORT || 4000;

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  await createConnection();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, TweetResolver, ReplyResolver],
      emitSchemaFile: true,
    }),
    context: ({ req, res }) => ({ req, res, userLoader: createUserLoader() }),
  });

  const app = express();

  app.use(
    session({
      store: new RedisStore({
        client: redisClient,
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      name: process.env.COOKIE_NAME,
      cookie: {
        httpOnly: true,
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 365 * 7,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
    })
  );

  server.applyMiddleware({ app });
  app.listen(PORT, () => {
    console.log("🚀 Server started!");
  });
};

main().catch(console.error);
