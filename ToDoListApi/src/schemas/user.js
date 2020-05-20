import { gql } from 'apollo-server';

const user = gql`
  type Token {
    status: String
    token: String
  }
  type User {
    id: ID
    username: String
  }
  extend type Query {
    me: User
  }
  extend type Mutation {
    login(username: String, password: String): Token
    registration(username: String, email: String, password: String): Token
  }
  `
export { user };