const typeDefs = `#graphql 
input GoalInput {
  period: Int!
  timestamp: String!
  scorer: String!
  assist: [String]
  shortHanded: Boolean
  powerPlay: Boolean
  record: String
}

input PenaltyInput {
  period: Int!
  timestamp: String!
  type: String
  minutes: Int!
  additionalMinutes: Int
  penalizedPlayer: String!
}

input MatchInput {
  date: String!
  location: String!
  referees: [String!]!
  homeTeam: String!
  awayTeam: String!
  homeTeamScore: Int!
  awayTeamScore: Int!
  goals: [GoalInput]!
  penalties: [PenaltyInput]
}
  type Goal {
    period: Int!
    timestamp: String!
    scorer: String!
    assist: [String]
    shortHanded: Boolean
    powerPlay: Boolean
}
  type Penalty {
  type: String
  minutes: Int
  additionalMinutes: Int
  penalizedPlayer: String
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
  goals: [Goal]
  penalties: [Penalty]
}
  type LeadingScorer {
    name: String!
    goals: Int!
  }
  type LeadingAssist {
    name: String!
    assists: Int!
  }
    type LeadingPenalties {
      name: String!
      penaltyMinutes: Int!
    }
    type PointsLeader {
      name: String
      goals: Int
      assists: Int
      total: Int
    }
  type Query {
    getMatches: [Match]
    getMatchByID(id: String): Match
    searchMatchEventsByString(query: String!): [Match]
    getPointsLeader: PointsLeader
    getLeadingScorer: LeadingScorer
    getLeadingAssist: LeadingAssist
    getMostPenaltyMinutes: LeadingPenalties
  }
  type Mutation {
    createMatch(input: MatchInput): Match
  }

`;
export default typeDefs;
