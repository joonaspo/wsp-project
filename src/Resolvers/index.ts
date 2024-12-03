import { inputObject, matchQueryParams } from 'src/Datasources/matchesApi';
import { ApolloContext } from 'src/types';

const resolvers = {
  Query: {
    getMatches: async (_: any, __: any, { dataSources }: ApolloContext) => {
      return await dataSources.MatchAPI.getMatches();
    },
    getMatchByID: async (
      _: any,
      id: matchQueryParams,
      { dataSources }: ApolloContext,
    ) => {
      return await dataSources.MatchAPI.getMatchByID(id);
    },
    getLeadingScorer: async (
      _: any,
      __: any,
      { dataSources }: ApolloContext,
    ) => {
      return await dataSources.MatchAPI.getLeadingScorer();
    },
    getLeadingAssist: async (
      _: any,
      __: any,
      { dataSources }: ApolloContext,
    ) => {
      return await dataSources.MatchAPI.getMostAssists();
    },
    getMostPenaltyMinutes: async (
      _: any,
      __: any,
      { dataSources }: ApolloContext,
    ) => {
      return await dataSources.MatchAPI.getMostPenaltyMinutes();
    },
  },
  Mutation: {
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
