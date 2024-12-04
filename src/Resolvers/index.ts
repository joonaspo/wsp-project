import { inputObject, matchQueryParams } from '../Datasources/matchesApi';
import { ApolloContext } from '../types';

const resolvers = {
  Query: {
    getMatches: async (
      _: unknown,
      __: unknown,
      { dataSources }: ApolloContext,
    ) => {
      return await dataSources.MatchAPI.getMatches();
    },
    getMatchByID: async (
      _: unknown,
      id: matchQueryParams,
      { dataSources }: ApolloContext,
    ) => {
      return await dataSources.MatchAPI.getMatchByID(id);
    },
    getLeadingScorer: async (
      _: unknown,
      __: unknown,
      { dataSources }: ApolloContext,
    ) => {
      return await dataSources.MatchAPI.getLeadingScorer();
    },
    getLeadingAssist: async (
      _: unknown,
      __: unknown,
      { dataSources }: ApolloContext,
    ) => {
      return await dataSources.MatchAPI.getMostAssists();
    },
    getMostPenaltyMinutes: async (
      _: unknown,
      __: unknown,
      { dataSources }: ApolloContext,
    ) => {
      return await dataSources.MatchAPI.getMostPenaltyMinutes();
    },
    getPointsLeader: async (
      _: unknown,
      __: unknown,
      { dataSources }: ApolloContext,
    ) => {
      return await dataSources.MatchAPI.getMostPoints();
    },
    searchMatchEventsByString: async (
      _: unknown,
      { query }: { query: string },
      { dataSources }: ApolloContext,
    ) => {
      return await dataSources.MatchAPI.searchMatches(query);
    },
  },
  Mutation: {
    createMatch: async (
      _: unknown,
      inputObject: inputObject,
      { dataSources }: ApolloContext,
    ) => {
      return await dataSources.MatchAPI.createMatch(inputObject);
    },
  },
};

export default resolvers;
