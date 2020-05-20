import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schemas';
import { resolvers } from './resolvers';
import { getPayload } from './components/tokenStrategy'
import { sequelize } from './models'

sequelize.sync({ force: false });

const app = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const { payload: user, loggedIn } = getPayload(token);
    
    return { user, loggedIn };
  },
});

app.listen(5050).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
  
  
  export default app;