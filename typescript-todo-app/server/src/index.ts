import express from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import User from "./models/User";
import Todo from "./models/Todo";
import { getUser } from "./utils/auth";

dotenv.config();

async function main() {
  await mongoose.connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }) => {
      const token = req.headers?.authorization || "";
      const user = await getUser(token);

      return { req, res, User, Todo, user };
    }
  });

  const app = express();
  server.applyMiddleware({ app });

  app.listen(process.env.PORT, () => {
    console.log(`Server started on http://localhost:4000/graphql`);
  });
}

main().catch(error => {
  console.log(error);
});
