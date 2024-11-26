import { teamObject } from 'src/Datasources/teamsApi';
import { userObject } from 'src/Datasources/usersApi';
import { ApolloContext } from 'src/types';

const resolvers = {
  Query: {
    getUsers: async (_: any, __: any, { dataSources }: ApolloContext) => {
      return await dataSources.UserAPI.getNonSensitiveUsers();
    },
    getTeams: async (_: any, __: any, { dataSources }: ApolloContext) => {
      return await dataSources.TeamAPI.getAllTeams();
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
    createTeam: async (
      _: any,
      teamObject: teamObject,
      { dataSources }: ApolloContext,
    ) => {
      console.log(teamObject);
      return await dataSources.TeamAPI.createTeam(teamObject);
    },
  },
};

export default resolvers;
