import { ApolloServer } from '@apollo/server';
import typeDefs from './src/TypeDefs/typeDefs.js';
import resolvers from './src/Resolvers/index.js';
import { startStandaloneServer } from '@apollo/server/standalone';
import sequelize from './src/Database/index.js';
import { ApolloContext } from './src/types.js';
import MatchAPI from './src/Datasources/matchesApi.js';

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
            MatchAPI: new MatchAPI(),
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
