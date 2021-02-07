import { Resolvers } from "../generated/graphql";
import { Query } from "./Query";
import { Mutation } from "./Mutation";
import { User } from "./User";
import { Todo } from "./Todo";

const resolvers: Resolvers = {
  Query,
  Mutation,
  User,
  Todo
};

export default resolvers;
