import MatchAPI from './Datasources/matchesApi';

export interface DataSources {
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
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
  sweaterNumber: number;
  position: string;
  teamId: string;
}

export type INewPlayer = Omit<IPlayer, 'id'>;

export interface ILineUp {
  forwards: IPlayer[];
  defensemen: IPlayer[];
  goalies: IPlayer[];
}

export interface IMatchEvent {
  id: string;
  period: number;
  timestamp: string;
  matchId: string;
}
export interface IPenalty extends IMatchEvent {
  type: EPenalties;
  minutes: number;
  additionalMinutes?: number;
  penalizedPlayer: string;
}

export interface IGoal extends IMatchEvent {
  scorer: string;
  assist?: string[];
  powerPlay: boolean;
  shortHanded: boolean;
}
