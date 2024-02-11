"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class KeyToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // KeyToken.belongsTo(models.User, {
      //   foreignKey: "userId",
      //   targetKey: "id",
      //   as: "userKeyToken",
      // });
    }
  }
  KeyToken.init(
    {
      userId: DataTypes.UUID,
      refreshToken: DataTypes.STRING,
      publicKey: DataTypes.STRING,
      privateKey: DataTypes.STRING,
      refreshTokenUsed: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: "KeyToken",
    }
  );
  return KeyToken;
};
