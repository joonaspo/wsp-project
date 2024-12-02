import Match from 'src/Models/match';
import {
  EPenalties,
  IGoalEvent,
  IPenaltyEvent,
  IPopulatedMatch,
} from 'src/types';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import Team from 'src/Models/team';

const penaltySchema = z.object({
  id: z.string().uuid(),
  period: z.number().int().positive(),
  timestamp: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format for match event',
  }),
  type: z.enum(Object.values(EPenalties) as [string, ...string[]]),
  minutes: z.number().int().positive(),
  additionalMinutes: z.number().int().nullable(),
  targetPlayerId: z.string().uuid(),
});

const goalEventSchema = z.object({
  id: z.string().uuid(),
  period: z.number().int().positive(),
  timestamp: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format for match event',
  }),
  scorerId: z.string().uuid(),
  assistId: z.array(z.string().uuid()).optional(),
});
// TODO: tee omat taulukkopropertit maaleille ja rangaistuksille
const matchSchema = z.object({
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  location: z.string(),
  referees: z.array(z.string()),
  homeTeam: z.string().uuid(),
  awayTeam: z.string().uuid(),
  homeTeamScore: z.number().int().nonnegative(),
  awayTeamScore: z.number().int().nonnegative(),
  goals: z.array(goalEventSchema),
  penalties: z.array(penaltySchema),
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
    penalties: IPenaltyEvent[];
    goals: IGoalEvent[];
  };
};
class MatchAPI {
  async createMatch(matchObject: inputObject) {
    console.log(matchObject);
    const inputObject = matchObject.input;
    try {
      const input = {
        ...inputObject,
        goals: inputObject.goals.map((g) => ({
          ...g,
          id: uuid(),
        })),
        penalties: inputObject.penalties.map((p) => ({
          ...p,
          id: uuid(),
        })),
      };
      matchSchema.parse(input);
      await Match.create(input);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error.message);
        throw new Error(error.message);
      }
      throw error;
    }
  }
  async getMatches() {
    const data = (await Match.findAll({
      include: [
        { model: Team, as: 'homeTeamDetails' },
        { model: Team, as: 'awayTeamDetails' },
      ],
    })) as IPopulatedMatch[];

    console.log(data[0].homeTeamDetails?.lineup);
    console.log(data[0].awayTeamDetails?.teamName);
  }
}

export default MatchAPI;
