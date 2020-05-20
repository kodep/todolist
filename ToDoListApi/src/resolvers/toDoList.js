import models from '../models'
import {
    GraphQLDateTime,
  } from 'graphql-iso-date';

const toDoListResolvers = {
    DateTime: GraphQLDateTime,
    Query: {
      getToDoItemByID: async (parent, args, context, info) => {
        if (context.user){
          const id = args.id;
          let item = await models.ToDoList.findByOdj({id: id});
          if (item === null || item.userId !== context.user.id) {
            return {}
          }
          return item
        }
      },
      getUserList: async (parent, args, context, info) => {
        if (context.user){
          const userId = context.user.id;
          let items = await models.ToDoList.findAllByOdj({userId: userId});
          return items
        }
      },
      getUserListByDate: async (parent, args, context, info) => {
        if (context.user){
          const userId = context.user.id;
          let items = await models.ToDoList.findAllByDate({userId: userId});
          return items
        }
      },
      getUserListByPriority: async (parent, args, context, info) => {
        if (context.user){
          const userId = context.user.id;
          let items = await models.ToDoList.findAllByPriority({userId: userId});
          return items
        }
      },
      getUserListByParam: async (parent, args, context, info) => {
        if (context.user){
          const userId = context.user.id;
          const orderBy = args.orderBy, orderGo = args.orderGo;
          let items = await models.ToDoList.findAllByParams({userId: userId}, orderBy, orderGo);
          return items
        }
      }
    },
    Mutation: {
      addToDoItem: async (parent, args, context, info) => {
        if (context.user){
          const text = args.text, closeDate = args.closeDate, priority = args.priority;
          models.ToDoList.create({
            text: text,
            isClosed: false,
            closeDate: new Date(closeDate),
            priority: priority,
            userId: context.user.id
          });
          return { status: 'Ok!' };
        }
      },
      updateIsClosed: async (parent, args, context, info) => {
        if (context.user){
            const id = args.id;
            let item = await models.ToDoList.findByOdj({id: id});
            await models.ToDoList.update({ isClosed: !item.isClosed }, { where: { id: id}});
          return { status: 'Ok!' };
        }
      },
      updateToDoItem: async (parent, args, context, info) => {
        if (context.user){
            const id = args.id;
            const item = {text: args.text, closeDate: args.closeDate, priority: args.priority, isClosed: args.isClosed};
            await models.ToDoList.update(item, { where: { id: id}});
          return { status: 'Ok!' };
        }
      },
      deleteById: async (parent, args, context, info) => {
        if (context.user){
            const id = args.id;
            await models.ToDoList.deleteItem({ id: id});
          return { status: 'Ok!' };
        }
      }
    }
  }
  
  export { toDoListResolvers }