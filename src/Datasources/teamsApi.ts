import { fetchTeamLineup } from 'src/Helpers/teamLineupFetcher';
import Team from 'src/Models/team';

export type teamObject = {
  teamName: string;
  teamShorthand: string;
};

class TeamAPI {
  async getAllTeams(condition: any) {
    const teams = await Team.findAll({ where: condition });
    console.log(condition);
    return teams;
  }
  async getTeamById(id: string) {
    const team = await Team.findByPk(id);
    return team;
  }
  async createTeam(teamObject: teamObject) {
    const existingTeam = await Team.findOne({
      where: { teamShorthand: teamObject.teamShorthand },
    });
    if (existingTeam !== null) {
      throw new Error('Team already exists!');
    }
    const playerData = await fetchTeamLineup(teamObject.teamShorthand);
    const teamToBeCreated = {
      ...teamObject,
      lineup: playerData,
    };
    const team = await Team.create(teamToBeCreated);
    return team;
  }
}

export default TeamAPI;
