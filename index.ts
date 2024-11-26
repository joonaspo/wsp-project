import { ApolloServer } from '@apollo/server';
import typeDefs from './src/TypeDefs/typeDefs';
import resolvers from './src/Resolvers';
import { startStandaloneServer } from '@apollo/server/standalone';
import sequelize from './src/Database';
import UserAPI from 'src/Datasources/usersApi';
import { ApolloContext } from 'src/types';
import TeamAPI from 'src/Datasources/teamsApi';

const server = new ApolloServer<ApolloContext>({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    await sequelize.sync({ force: false });
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
      context: async () => {
        return {
          dataSources: {
            UserAPI: new UserAPI(),
            TeamAPI: new TeamAPI(),
          },
        };
      },
    });
    console.log(`GraphQL endpoint at ${url}`);
  } catch (error) {
    console.error(error);
  }
};

startServer();
