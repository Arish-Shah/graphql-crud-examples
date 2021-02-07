import { AuthenticationError } from "apollo-server-express";
import { Context } from "../Context";
import { QueryResolvers, Todo, User } from "../generated/graphql";

export const Query: QueryResolvers = {
  user: (_: any, __: any, { user }: Context): User => {
    if (!user) throw new AuthenticationError("Unauthenticated");
    return user as User;
  }
};
