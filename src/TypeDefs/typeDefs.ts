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
    lineup: Lineup,
    updatedAt: String
  }

input GoalInput {
  period: Int!
  timestamp: String!
  scorerId: String!
  assistId: [String!]
}

input PenaltyInput {
  period: Int!
  timestamp: String!
  type: String
  minutes: Int!
  additionalMinutes: Int
  targetPlayerId: String!
}

input MatchInput {
  date: String!
  location: String!
  referees: [String!]!
  homeTeam: String!
  awayTeam: String!
  homeTeamScore: Int!
  awayTeamScore: Int!
  goals: [GoalInput!]!
  penalties: [PenaltyInput!]
}
  type Goal {
  id: String
  period: Int!
  timestamp: String!
  scorerId: String
  assistId: [String!]!
}
  type Penalty {
  type: String
  minutes: Int
  additionalMinutes: Int
  targetPlayerId: String
  id: String!
  period: Int!
  timestamp: String!
}
type Match {
  id: String!
  date: String!
  location: String!
  referees: [String!]!
  homeTeam: String!
  awayTeam: String!
  homeTeamScore: Int!
  awayTeamScore: Int!
  goals: [Goal!]!
  penalties: [Penalty!]
}
  type Query {
    getUsers: [User]
    getTeams(teamName: String): [Team]
    getMatches: [Match]
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
    ): Team
    createMatch(input: MatchInput): Match
  }

`;
export default typeDefs;
