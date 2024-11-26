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
import { IMatchEvent } from 'src/types';

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
  declare matchEvents: [IMatchEvent];
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
    matchEvents: {
      type: DataTypes.JSON,
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

export default Match;
