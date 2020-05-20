import { getToken, getPayload, encryptPassword, comparePassword } from '../components/tokenStrategy';
import models from '../models'

const userResolvers = {
  Query: {
    me: async (parent, args, context, info) => {
      return context.user;
    }
  },
  Mutation: {
    login: async (parent, args, context, info) => {
      const name = args.username, password = args.password;
      let user = await models.User.findByOdj({username: name});
      const isMatch = await comparePassword(password, user.password);
      if (isMatch) {
        const token = getToken(user);
        return {token: token, status: 'OK' };
      } else {
        return { status: 'Bad login or password', token: '' };
      }
    },
    registration: async (parent, args, context, info) => {
      const name = args.username, password = args.password, email = args.email;
      let user = await models.User.findByOdj({email: email});
      if (!user) {
        const newUser = { username: name, password: await encryptPassword(password), email: email };
        models.User.create(newUser);
        const token = getToken(newUser);
        return {token: token, status: 'OK'};
      } else{
        return { status: 'This email already exists', token: '' };
      }
    }
  }
}

export { userResolvers }