const { Sequelize } = require("sequelize");

const {
  db: { database, username, password, host, dialect },
} = require("../configs/db");

class connectDatabase {
  constructor() {
    this.connect();
  }
  async connect() {
    const config = new Sequelize(database, username, password, {
      host: host,
      dialect: dialect,
      logging: false,
      timezone: "+07:00",
      // pool: {
      //   max: parseInt(maxPool),
      //   min: parseInt(minPool),
      //   acquire: parseInt(acquire),
      //   idle: parseInt(idle)
      // }
    });
    try {
      await config.authenticate();
      console.log("Connection has been established successfully.");
    } catch (err) {
      console.error("Unable to connect to the database:", err);
    }
  }

  static getInstance() {
    if (!connectDatabase.instance) {
      connectDatabase.instance = new connectDatabase();
    }

    return connectDatabase.instance;
  }
}
const instance = connectDatabase.getInstance();

module.exports = instance;
