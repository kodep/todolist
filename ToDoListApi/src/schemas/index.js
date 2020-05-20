import { gql } from 'apollo-server';
import { user } from './user';
import { toDoList } from './toDoList';

const typeDefs = gql`
  type Query{
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  ${user}
  ${toDoList}
`;
export { typeDefs };