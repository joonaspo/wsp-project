import MatchAPI from './Datasources/matchesApi';
import TeamAPI from './Datasources/teamsApi';
import UserAPI from './Datasources/usersApi';
import Match from './Models/match';
import Team from './Models/team';

export interface DataSources {
  UserAPI: UserAPI;
  TeamAPI: TeamAPI;
  MatchAPI: MatchAPI;
}

export interface ApolloContext {
  dataSources: DataSources;
}

export enum EPenalties {
  Minor_Hooking = 'Hooking',
  Minor_Tripping = 'Tripping',
  Minor_Interference = 'Interference',
  Minor_Slashing = 'Slashing',
  Minor_Elbowing = 'Elbowing',
  Minor_HighSticking = 'High Sticking',
  Minor_TooManyMen = 'Too Many Men',
  Minor_DelayOfGame = 'Delay of Game',
  Minor_Holding = 'Holding',
  Minor_Roughing = 'Roughing',

  Major_Fighting = 'Fighting',
  Major_CheckingFromBehind = 'Checking From Behind',
  Major_Boarding = 'Boarding',
  Major_Charging = 'Charging',
  Major_Kneeing = 'Kneeing',
  Major_Spear = 'Spear',

  Misconduct_UnsportsmanlikeConduct = 'Unsportsmanlike Conduct',
  Misconduct_GameMisconduct = 'Game Misconduct',
  Misconduct_AbuseOfOfficials = 'Abuse of Officials',

  Match_Penalty = 'Match Penalty',
  Match_SlewFooting = 'Slew Footing',

  Penalty_Shot = 'Penalty Shot',
  Bench_Minor = 'Bench Minor',
}

export interface IPlayer {
  id: string;
  teamShorthand: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
  sweaterNumber: number;
  position: string;
}

export interface ILineUp {
  forwards: IPlayer[];
  defensemen: IPlayer[];
  goalies: IPlayer[];
}

export interface IMatchEvent {
  id: string;
  period: number;
  timestamp: string;
}
export interface IPenaltyEvent extends IMatchEvent {
  type: EPenalties;
  minutes: number;
  additionalMinutes?: number;
  targetPlayerId: string;
}

export interface IGoalEvent extends IMatchEvent {
  scorerId: string;
  assistId?: string[];
}

export interface IPopulatedMatch extends Match {
  homeTeamDetails: Team;
  awayTeamDetails: Team;
}

export type INewGoalEvent = Omit<IGoalEvent, 'id'>;
export type INewPenaltyEvent = Omit<IPenaltyEvent, 'id'>;
