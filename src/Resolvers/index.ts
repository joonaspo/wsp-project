import { userObject } from 'src/Datasources/usersApi';
import { ApolloContext } from 'src/types';

const resolvers = {
  Query: {
    getUsers: async (_: any, __: any, { dataSources }: ApolloContext) => {
      return await dataSources.UserAPI.getNonSensitiveUsers();
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      userObject: userObject,
      { dataSources }: ApolloContext,
    ) => {
      console.log(userObject);
      return await dataSources.UserAPI.createUser(userObject);
    },
  },
};

export default resolvers;
