import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema, Query, Resolver } from "type-graphql";

@Resolver()
class HelloResolver {
  @Query(() => String)
  hello(): string {
    return "Hello World";
  }
}

const main = async () => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver]
    })
  });

  const app = express();
  server.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log("Server running on http://localhost:4000/graphql");
  });
};

main().catch(error => {
  console.log(error);
});
