import { gql } from "apollo-server-express";

export default gql`
  type Query {
    user: User
  }

  type Mutation {
    register(registerInput: RegisterInput!): AuthPayload
    login(loginInput: LoginInput!): AuthPayload
    addTodo(title: String!): Todo!
    deleteTodo(_id: ID!): Todo
    updateTodo(todo: UpdateTodoInput): Todo
  }

  type User {
    _id: ID!
    email: String!
    name: String!
    todos: [Todo!]!
  }

  type Todo {
    _id: ID!
    title: String!
    done: Boolean!
    creator: User!
    createdAt: Date!
    updatedAt: Date!
  }

  type AuthPayload {
    token: String!
    expiresIn: String
  }

  input RegisterInput {
    email: String!
    password: String!
    name: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UpdateTodoInput {
    _id: ID!
    title: String
    done: Boolean
  }

  scalar Date
`;
