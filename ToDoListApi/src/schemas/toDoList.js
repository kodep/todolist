import { gql } from 'apollo-server';
import { GraphQLDateTime } from 'graphql-iso-date';

const toDoList = gql`
  scalar DateTime
  type toDoItem {
    id: ID
    text: String
    priority: Int
    closeDate: DateTime
    isClosed: Boolean
    userId: ID
  }
  type Result {
    status: String
  }
  extend type Query{
    getUserList: [toDoItem]
    getUserListByDate: [toDoItem]
    getUserListByPriority: [toDoItem]
    getToDoItemByID(id: ID): toDoItem
    getUserListByParam(orderBy: String, orderGo: String): [toDoItem]
  }

  extend type Mutation {
    addToDoItem(text: String, closeDate: DateTime, priority: Int):Result
    updateIsClosed(id: ID):Result
    updateToDoItem(id: ID, text: String, closeDate: DateTime, priority: Int, isClosed: Boolean):Result
    deleteById(id:ID):Result
  }
  `
export { toDoList };