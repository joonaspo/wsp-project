import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../Database/index.js';
import { IGoal, IPenalty } from '../types.js';

// Using Sequelize's utility types to extract attributes from the model class
class Match extends Model<
  InferAttributes<Match>,
  InferCreationAttributes<Match>
> {
  declare id: CreationOptional<string>;
  declare date: string;
  declare homeTeam: string;
  declare awayTeam: string;
  declare homeTeamScore: number;
  declare awayTeamScore: number;
  declare penalties: IPenalty[];
  declare goals: IGoal[];
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    homeTeam: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    awayTeam: {
      type: DataTypes.STRING,
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

export default Match;
