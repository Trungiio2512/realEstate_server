// const {
//   db: { dialect, database, username, password, host },
// } = require("./db");
require("dotenv").config();

module.exports = {
  development: {
    dialect: process.env.DB_DIALECT_DEV,
    database: process.env.DB_NAME_DEV,
    username: process.env.DB_DATABASE_DEV,
    password: process.env.DB_PASSWD_DEV,
    host: process.env.DB_HOST_DEV,
  },
};
// {
//     "development": {
//       "username": "postgres",
//       "password": "trungiio",
//       "database": "realestate",
//       "host": "localhost",
//       "dialect": "postgres"
//     },
//     "test": {
//       "username": "root",
//       "password": null,
//       "database": "database_test",
//       "host": "127.0.0.1",
//       "dialect": "mysql"
//     },
//     "production": {
//       "username": "root",
//       "password": null,
//       "database": "database_production",
//       "host": "127.0.0.1",
//       "dialect": "mysql"
//     }
//   }
