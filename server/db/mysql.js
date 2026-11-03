
// const dbConfig = require('../config/dbConfig');
// const {Sequelize} = require('sequelize');


// const db = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,
//     {
//     host:dbConfig.HOST,
//     dialect:dbConfig.DIALECT,
// }
// );


// module.exports = db;
const dbConfig = require('../config/dbConfig');
const { Sequelize } = require('sequelize');

const db = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: Number(process.env.DB_PORT || 4000),
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        minVersion: 'TLSv1.2'
      }
    },
    logging: false
  });
module.exports = db;
