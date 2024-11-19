import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Optional,
} from 'sequelize';
import sequelize from '../Database';
import bcrypt from 'bcryptjs';

interface UserAttributes {
  id: string;
  username: string;
  password: string;
  displayName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  id!: string;
  username!: string;
  password!: string;
  displayName!: string;
  createdAt?: Date;
  updatedAt?: Date;

  static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Username is required',
        },
        len: {
          args: [3, 20],
          msg: 'Username must be between 3 and 20 characters',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required',
        },
        len: {
          args: [8, 255],
          msg: 'Password must be at least 8 characters long',
        },
      },
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Display Name is required',
        },
        len: {
          args: [3, 20],
          msg: 'Display Name must be between 3 and 20 characters',
        },
      },
    },
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'user',
    timestamps: true,
  },
);

export default User;
