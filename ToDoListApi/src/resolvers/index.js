import { userResolvers } from './user'
import { toDoListResolvers } from './toDoList'
import GMR from 'graphql-merge-resolvers'

const resolvers = GMR.merge([userResolvers, toDoListResolvers]);

export { resolvers };