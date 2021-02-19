import {
  ApolloError,
  AuthenticationError,
  ValidationError
} from "apollo-server-express";
import bcrypt from "bcryptjs";

import isEmail from "validator/lib/isEmail";
import isAlphanumeric from "validator/lib/isAlphanumeric";

import { Context } from "../Context";
import {
  AuthPayload,
  MutationAddTodoArgs,
  MutationDeleteTodoArgs,
  MutationLoginArgs,
  MutationRegisterArgs,
  MutationResolvers,
  MutationUpdateTodoArgs,
  Todo
} from "../generated/graphql";
import { createToken } from "../utils/auth";

export const Mutation: MutationResolvers = {
  register: async (
    _: any,
    args: MutationRegisterArgs,
    { User }: Context
  ): Promise<AuthPayload> => {
    try {
      const { email, password, name } = args.registerInput;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new ApolloError("User already exists");
      }

      if (!isEmail(email)) throw new ValidationError("Invalid email");
      if (!isAlphanumeric(password))
        throw new ValidationError("Invalid password");

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword, name });
      const doc = await user.save();

      return createToken(doc);
    } catch (error) {
      throw error;
    }
  },
  login: async (
    _: any,
    args: MutationLoginArgs,
    { User }: Context
  ): Promise<AuthPayload> => {
    try {
      const { email, password } = args.loginInput;
      const user = await User.findOne({ email });
      if (!user) {
        throw new ApolloError("User not found");
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new ApolloError("Incorrect password");
      }

      return createToken(user);
    } catch (error) {
      throw error;
    }
  },
  addTodo: async (
    _: any,
    args: MutationAddTodoArgs,
    { user, Todo }: Context
  ): Promise<Todo> => {
    try {
      if (!user) throw new AuthenticationError("Unauthenticated");
      const { title } = args;
      const todo = new Todo({ title, creator: user._id });
      const doc = await todo.save();
      return doc as Todo;
    } catch (error) {
      throw error;
    }
  },
  deleteTodo: async (
    _: any,
    args: MutationDeleteTodoArgs,
    { Todo }: Context
  ): Promise<Todo> => {
    try {
      const todo = await Todo.findOne({ _id: args._id });
      if (!todo) throw new ApolloError("Todo not found");
      await todo.remove();
      return todo as Todo;
    } catch (error) {
      throw error;
    }
  },
  updateTodo: async (
    _: any,
    args: MutationUpdateTodoArgs,
    { Todo }: Context
  ): Promise<Todo> => {
    try {
      const _id = args.todo?._id;
      const todo = await Todo.findById(_id);
      if (!todo) throw new ApolloError("Todo not found");

      todo.done = args.todo?.done!;

      if (args.todo?.title) {
        todo.title = args.todo.title;
      }
      const doc = await todo.save();
      return doc as Todo;
    } catch (error) {
      throw error;
    }
  }
};
