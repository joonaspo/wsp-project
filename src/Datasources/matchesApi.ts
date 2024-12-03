import { GraphQLError } from 'graphql';
import Match from 'src/Models/match';
import { EPenalties, IGoal, IPenalty } from 'src/types';
import { z } from 'zod';
import _ from 'lodash';
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
      throw new GraphQLError('No matches found!');
    }
  }

  async getMatchByID(params: matchQueryParams) {
    try {
      const match = await Match.findByPk(params.id);
      console.log(match);
      return match;
    } catch (error) {
      throw new GraphQLError('Match not found!');
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
        .maxBy(([_, goals]) => goals);
      // Loop through all scorers
      if (!maxScorer) {
        throw new GraphQLError('Max scorer not found!');
      }
      const [leadingScorer, maxGoals] = maxScorer;
      return {
        name: leadingScorer,
        goals: maxGoals,
      };
    } catch (error) {
      throw new GraphQLError('Failed to get leading scorer!');
    }
  }
  async getMostAssists() {
    try {
      const assistCounts: AssistCount = {};
      const matches = await Match.findAll();
      matches.forEach((match) => {
        match.goals.forEach((goal) => {
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
      throw new GraphQLError('Failed to get leading assists!');
    }
  }
  async getMostPenaltyMinutes() {
    try {
      const penaltiesCount: PenaltyMinutes = {};
      const matches = await Match.findAll();
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
        .maxBy(([_, penalties]) => penalties);
      console.log(maxPenalties);
      if (!maxPenalties) {
        throw new GraphQLError('Leading penalty minutes not found!');
      }
      const [leadingOffender, penalties] = maxPenalties;
      console.log(penalties);
      return {
        name: leadingOffender,
        penaltyMinutes: penalties,
      };
    } catch (error) {}
  }
}

export default MatchAPI;
