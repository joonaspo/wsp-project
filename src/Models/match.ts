import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from 'src/Database';
import Team from './team';
import { IGoalEvent, IPenaltyEvent } from 'src/types';

class Match extends Model<
  InferAttributes<Match>,
  InferCreationAttributes<Match>
> {
  declare id: CreationOptional<string>;
  declare date: string;
  declare homeTeam: ForeignKey<Team['id']>;
  declare awayTeam: ForeignKey<Team['id']>;
  declare homeTeamScore: number;
  declare awayTeamScore: number;
  declare penalties: IPenaltyEvent[];
  declare goals: IGoalEvent[];
  declare referees: string[];
  declare location: string;
  declare updatedAt: CreationOptional<Date>;
}

Match.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    homeTeam: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    awayTeam: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    homeTeamScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeamScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    penalties: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    goals: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    referees: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'match',
    tableName: 'matches',
  },
);

Match.belongsTo(Team, { as: 'homeTeamDetails', foreignKey: 'homeTeam' });
Match.belongsTo(Team, { as: 'awayTeamDetails', foreignKey: 'awayTeam' });

export default Match;
