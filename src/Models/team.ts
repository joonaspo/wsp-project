import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from 'src/Database';

import { ILineUp } from 'src/types';
import Match from './match';

class Team extends Model<InferAttributes<Team>, InferCreationAttributes<Team>> {
  declare id: CreationOptional<string>;
  declare matches: CreationOptional<[ForeignKey<Match['id']>]>;
  declare teamName: string;
  declare teamShorthand: string;
  declare lineup: ILineUp;
  declare updatedAt: CreationOptional<Date>;
}

Team.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    matches: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teamShorthand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lineup: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'team',
    tableName: 'teams',
  },
);

export default Team;
