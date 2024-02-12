const db = require("../models");
const sequelize = require("sequelize");
const createTokenPair = async (userId, publicKey, privateKey, refreshToken) => {
  const keyToken = await db.KeyToken.findOne({ where: { userId } });
  let res;
  if (!keyToken) {
    res = await db.KeyToken.create({
      userId,
      publicKey,
      privateKey,
      refreshToken,
      refreshTokenUsed: [refreshToken],
    });
  } else {
    res = await db.KeyToken.update(
      {
        publicKey,
        privateKey,
        refreshToken,
        refreshTokenUsed: sequelize.fn(
          "array_append",
          sequelize.col("refreshTokenUsed"),
          refreshToken
        ),
      },
      {
        where: { userId },
      }
    );
  }
  return await getTokenPair(userId);
};

const getTokenPair = async (userId) => {
  const data = await db.KeyToken.findOne({
    where: { userId: userId },
  });
  return data;
};

module.exports = {
  createTokenPair,
  getTokenPair,
};
