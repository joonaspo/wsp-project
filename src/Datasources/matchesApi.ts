import { GraphQLError } from 'graphql';
import Match from '../Models/match.js';
import { EPenalties, IGoal, IPenalty } from '../types.js';
import { z } from 'zod';
import _ from 'lodash';
import { Op } from 'sequelize';

// Zod validation schemas for penalties, goals and matches
const penaltySchema = z.object({
  period: z.number().int().positive(),
  timestamp: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format for match event',
  }),
  type: z.enum(Object.values(EPenalties) as [string, ...string[]]),
  minutes: z.number().int().positive(),
  additionalMinutes: z.number().int().nullable(),
  penalizedPlayer: z.string(),
});

const goalSchema = z.object({
  period: z.number().int().positive(),
  timestamp: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format for match event',
  }),
  scorer: z.string().min(5).max(30),
  assist: z.array(z.string()).optional(),
});

const matchSchema = z.object({
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  location: z.string(),
  referees: z.array(z.string()),
  homeTeam: z.string().min(5).max(30),
  awayTeam: z.string().min(5).max(30),
  homeTeamScore: z.number().int().nonnegative(),
  awayTeamScore: z.number().int().nonnegative(),
  penalties: z.array(penaltySchema),
  goals: z.array(goalSchema),
});

export type inputObject = {
  input: {
    date: string;
    location: string;
    referees: string[];
    homeTeam: string;
    awayTeam: string;
    homeTeamScore: number;
    awayTeamScore: number;
    penalties: IPenalty[];
    goals: IGoal[];
  };
};

export type matchQueryParams = {
  id: string;
};

interface ScorerCount {
  [scorer: string]: number;
}

interface AssistCount {
  [assist: string]: number;
}

interface PenaltyMinutes {
  [offender: string]: number;
}

interface PointsCount {
  [player: string]: { goals: number; assists: number };
}

class MatchAPI {
  async createMatch(matchObject: inputObject) {
    console.log(matchObject);
    try {
      const formattedDate = matchObject.input.date;
      console.log(formattedDate);
      const object = {
        ...matchObject.input,
        date: formattedDate,
      };
      matchSchema.parse(object);
      const match = await Match.create(object);
      console.log(match);
      return match;
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error.message);
        throw new Error(error.message);
      }
      throw error;
    }
  }
  async getMatches() {
    try {
      const data = await Match.findAll();
      return data;
    } catch (error) {
      console.log(error);
      throw new GraphQLError('Error getting matches!');
    }
  }

  async getMatchByID(params: matchQueryParams) {
    try {
      const match = await Match.findByPk(params.id);
      console.log(match);
      if (!match) {
        throw new GraphQLError(`Match not found with id: ${params.id}!`, {
          extensions: { code: 'NOT_FOUND' },
        });
      }
      return match;
    } catch (error) {
      console.log(error);
      throw new GraphQLError('Error finding match with ID!');
    }
  }

  async getLeadingScorer() {
    try {
      const matches = await Match.findAll();
      const scorerCount: ScorerCount = {};
      matches.forEach((match) => {
        match.goals.forEach((goal) => {
          const scorer = goal.scorer;
          scorerCount[scorer] = (scorerCount[scorer] || 0) + 1;
        });
      });
      const maxScorer = _(scorerCount)
        .toPairs()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .maxBy(([_, goals]) => goals);

      if (!maxScorer) {
        throw new GraphQLError('Max scorer not found!');
      }
      const [leadingScorer, maxGoals] = maxScorer;
      return {
        name: leadingScorer,
        goals: maxGoals,
      };
    } catch (error) {
      console.log(error);
      throw new GraphQLError('Failed to get leading scorer!');
    }
  }
  async getMostAssists() {
    try {
      const assistCounts: AssistCount = {};
      const matches = await Match.findAll();
      matches.forEach((match) => {
        match.goals.forEach((goal) => {
          // If the goal has assists, processing each assister
          if (goal.assist !== undefined && goal.assist?.length > 0) {
            const assist = goal.assist;
            assist?.forEach((a) => {
              assistCounts[a] = (assistCounts[a] || 0) + 1;
            });
          }
        });
      });

      const maxAssists = _(assistCounts)
        .toPairs()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .maxBy(([_, assist]) => assist);

      if (!maxAssists) {
        throw new GraphQLError('Leading assists not found!');
      }
      const [leadingAssist, assists] = maxAssists;
      return {
        name: leadingAssist,
        assists: assists,
      };
    } catch (error) {
      console.log(error);
      throw new GraphQLError('Failed to get leading assists!');
    }
  }

  async getMostShorthandedGoals() {
    try {
      const goalsCount: ScorerCount = {};
      const matches = await Match.findAll();
      matches.forEach((match) => {
        match.goals.forEach((goal) => {
          // Processing only short handed goals
          if (goal.shortHanded === true) {
            goalsCount[goal.scorer] = (goalsCount[goal.scorer] || 0) + 1;
          }
        });
      });
      const maxShorthandedGoals = _(goalsCount)
        .toPairs()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .maxBy(([_, goal]) => goal);
      if (!maxShorthandedGoals) {
        throw new GraphQLError('Leading shorthanded scorer not found!');
      }
      const [leadingScorer, goals] = maxShorthandedGoals;
      return {
        name: leadingScorer,
        goals,
      };
    } catch (error) {
      console.log(error);
      throw new GraphQLError('Failed to get leading shorthanded scorer!');
    }
  }

  async getMostPoints() {
    try {
      const matches = await Match.findAll();
      const pointsCount: PointsCount = {};
      matches.forEach((match) => {
        match.goals.forEach((goal) => {
          const scorer = goal.scorer;
          // Initializing player's stats
          if (!pointsCount[scorer]) {
            pointsCount[scorer] = { goals: 0, assists: 0 };
          }
          // Incrementing goal count
          pointsCount[scorer].goals += 1;
          // If goal has assists, looping through them
          if (goal.assist !== undefined && goal.assist.length > 0) {
            goal.assist.forEach((assist) => {
              // Ensuring that the assister is initialized
              if (!pointsCount[assist]) {
                pointsCount[assist] = { goals: 0, assists: 0 };
              }
              // Next incrementing assist count
              pointsCount[assist].assists += 1;
            });
          }
        });
      });
      const maxPoints = _(pointsCount)
        .toPairs()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .maxBy(([_, stats]) => stats.goals + stats.assists);

      if (!maxPoints) {
        throw new GraphQLError('Max point scorer not found!');
      }
      const [name, points] = maxPoints;
      return {
        name: name,
        goals: points.goals,
        assists: points.assists,
        total: points.goals + points.assists,
      };
    } catch (error) {
      console.log(error);
      throw new GraphQLError('Failed to find max point scorer!');
    }
  }

  async getMostPenaltyMinutes() {
    try {
      const penaltiesCount: PenaltyMinutes = {};
      const matches = await Match.findAll();
      // Constructing penaltiesCount object for each penalized player and summing their penalty minutes
      matches.forEach((match) => {
        if (match.penalties.length > 0) {
          match.penalties.forEach((penalty) => {
            const offender = penalty.penalizedPlayer;
            penaltiesCount[offender] =
              (penaltiesCount[offender] || 0) +
              penalty.minutes +
              (penalty.additionalMinutes ? penalty.additionalMinutes : 0);
          });
        }
      });
      const maxPenalties = _(penaltiesCount)
        .toPairs()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .maxBy(([_, penalties]) => penalties);
      if (!maxPenalties) {
        throw new GraphQLError('Leading penalty minutes not found!');
      }
      const [leadingOffender, penalties] = maxPenalties;
      console.log(penalties);
      return {
        name: leadingOffender,
        penaltyMinutes: penalties,
      };
    } catch (error) {
      console.log(error);
      throw new GraphQLError('Failed to get leading penalty minutes!');
    }
  }

  async searchMatches(query: string) {
    console.log(query);
    try {
      const matches = await Match.findAll({
        // Executing search for possible matches in location, homeTeam, or awayTeam with query string
        // Search is case-insensitive and includes partial matches
        where: {
          [Op.or]: [
            { location: { [Op.iLike]: `%${query}` } },
            { homeTeam: { [Op.iLike]: `%${query}` } },
            { awayTeam: { [Op.iLike]: `%${query}` } },
          ],
        },
      });
      if (matches.length < 1) {
        throw new GraphQLError(`Error searching with search string: ${query}`);
      }
      return matches;
    } catch (error) {
      console.log(error);
      throw new GraphQLError('Failed to search for matches!');
    }
  }
}

export default MatchAPI;
