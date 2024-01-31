"use strict";
const dev = {
  app: {
    port: process.env.PORT_DEV || 8888,
  },
  db: {
    dialect: process.env.DB_DIALECT_DEV || "postgres",
    database: process.env.DB_NAME_DEV || "realestate",
    username: process.env.DB_DATABASE_DEV || "postgres",
    password: process.env.DB_PASSWD_DEV,
  },
};
const production = {
  app: {
    port: process.env.PORT,
  },
  db: {
    dialect: process.env.DB_DIALECT_PROD,
    database: process.env.DB_NAME_PROD,
    username: process.env.DB_DATABASE_PROD,
    password: process.env.DB_PASSWD_PROD,
  },
};

const config = { dev, production };

const env = process.env.ENVIRONMENT || "dev";

module.exports = config[env];
