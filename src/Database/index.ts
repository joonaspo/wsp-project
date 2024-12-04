import { Sequelize } from 'sequelize';
import { DB_URI } from '../Utils/config.js';

const sequelize = new Sequelize(DB_URI, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: console.log,
});

export default sequelize;
