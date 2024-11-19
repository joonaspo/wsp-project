const typeDefs = `#graphql 

  type User {
    displayName: String,
    username: String
  }
  type Query {
    getUsers: [User]
  }
  type Mutation {
    createUser(
      displayName: String
      username: String
      password: String
      passwordConfirmation: String
      ): Boolean
  }

`;
export default typeDefs;
