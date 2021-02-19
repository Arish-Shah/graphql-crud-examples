import { AuthenticationError } from "apollo-server-express";
import { Context } from "../Context";
import { Todo, UserResolvers } from "../generated/graphql";

export const User: UserResolvers = {
  todos: async (parent, _: any, { Todo, user }: Context): Promise<Todo[]> => {
    try {
      if (user?.todos) {
        const todos = await Todo.find({ _id: { $in: user.todos } });
        return todos as Todo[];
      }
      throw new AuthenticationError("Unauthenticated");
    } catch (error) {
      throw error;
    }
  }
};
