import { fetchTeamLineup } from 'src/Helpers/teamLineupFetcher';
import Team from 'src/Models/team';

export type teamObject = {
  teamName: string;
  teamShorthand: string;
};

class TeamAPI {
  async getAllTeams() {
    const teams = await Team.findAll();
    return teams;
  }
  async getTeamById(id: string) {
    const team = await Team.findByPk(id);
    return team;
  }
  async createTeam(teamObject: teamObject) {
    const playerData = await fetchTeamLineup(teamObject.teamShorthand);
    const teamToBeCreated = {
      ...teamObject,
      lineup: playerData,
    };
    await Team.create(teamToBeCreated);
    console.log(playerData);
  }
}

export default TeamAPI;
