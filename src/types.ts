import UserAPI from './Datasources/usersApi';

export interface DataSources {
  UserAPI: UserAPI;
}

export interface ApolloContext {
  dataSources: DataSources;
}
