const typeDefs = `#graphql 
  type User {
    displayName: String,
    username: String
  }
  type Player {
    id: String,
    teamShorthand: String,
    firstName: String,
    lastName: String,
    birthDate: String,
    country: String,
    sweaterNumber: Int,
    position: String
  }
  type Lineup {
    forwards: [Player],
    defensemen: [Player],
    goalies: [Player]
  }
  type Team {
    id: String
    teamName: String,
    teamShorthand: String,
    matches: [String],
    lineup: Lineup
  }
  type Query {
    getUsers: [User]
    getTeams: [Team]
  }
  type Mutation {
    createUser(
      displayName: String
      username: String
      password: String
      passwordConfirmation: String
      ): Boolean
    createTeam(
      teamName: String
      teamShorthand: String
    ): Boolean
  }

`;
export default typeDefs;
