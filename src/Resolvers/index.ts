import { Op } from 'sequelize';
import { inputObject } from 'src/Datasources/matchesApi';
import { teamObject } from 'src/Datasources/teamsApi';
import { userObject } from 'src/Datasources/usersApi';
import { ApolloContext } from 'src/types';

const resolvers = {
  Query: {
    getUsers: async (_: any, __: any, { dataSources }: ApolloContext) => {
      return await dataSources.UserAPI.getNonSensitiveUsers();
    },
    getTeams: async (
      _: any,
      { teamName }: { teamName?: string },
      { dataSources }: ApolloContext,
    ) => {
      const condition: any = {};
      console.log(teamName);
      if (teamName) {
        condition.teamName = {
          [Op.like]: `%${teamName}%`,
        };
      }
      return await dataSources.TeamAPI.getAllTeams(condition);
    },
    getMatches: async (_: any, __: any, { dataSources }: ApolloContext) => {
      return await dataSources.MatchAPI.getMatches();
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
    createMatch: async (
      _: any,
      inputObject: inputObject,
      { dataSources }: ApolloContext,
    ) => {
      return await dataSources.MatchAPI.createMatch(inputObject);
    },
  },
};

export default resolvers;
