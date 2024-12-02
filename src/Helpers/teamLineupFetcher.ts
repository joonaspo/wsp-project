import { ILineUp, IPlayer } from 'src/types';
import { v4 as uuid } from 'uuid';
interface IPlayerApiResponse {
  id: number;
  headshot: string;
  firstName: { default: string; cs?: string; sk?: string };
  lastName: { default: string; cs?: string; sk?: string };
  sweaterNumber: number;
  positionCode: string;
  shootsCatches: string;
  heightInInches: number;
  weightInPounds: number;
  heightInCentimeters: number;
  weightInKilograms: number;
  birthDate: string;
  birthCity: { default: string; cs?: string; sk?: string };
  birthCountry: string;
  birthStateProvince?: { default: string };
}

const baseUrl = 'https://api-web.nhle.com/v1/roster/';
export const fetchTeamLineup = async (teamShorthand: string) => {
  try {
    const response = await fetch(`${baseUrl}${teamShorthand}/20242025`);
    if (response.ok) {
      const data = await response.json();
      const playersData: ILineUp = {
        forwards: mapPlayers(data.forwards, teamShorthand),
        defensemen: mapPlayers(data.defensemen, teamShorthand),
        goalies: mapPlayers(data.goalies, teamShorthand),
      };
      return playersData;
    } else {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Error ${error}`);
  }
};

const mapPlayers = (
  playersArray: IPlayerApiResponse[],
  teamShorthand: string,
): IPlayer[] => {
  return playersArray.map((player) => ({
    id: uuid(),
    teamShorthand: teamShorthand,
    firstName: player.firstName.default,
    lastName: player.lastName.default,
    birthDate: player.birthDate,
    country: player.birthCountry,
    sweaterNumber: player.sweaterNumber,
    position: player.positionCode,
  }));
};
