const { Forbidden, NotFound } = require("../helpers/errorResponse");
const db = require("../models");
const { getTokenPair } = require("../services/keyToken_service");
const { HEADER } = require("../utils/contants");
const jwt = require("jsonwebtoken");
const verifyJwt = (token, sceretKey) => {
  return jwt.verify(token, sceretKey);
};
const authorization = async (req, res, next) => {
  const token = req?.headers["authorization"].startWith("Bearer").split(" ")[1];
  if (!token) {
    throw new Forbidden("Forbidden");
  }

  const userId = req.headers[HEADER.CLIENT_ID];

  if (!userId) {
    throw new Forbidden("Forbidden");
  }

  try {
    const keyToken = await getTokenPair(userId);
    if (!keyToken) {
      throw new NotFound("Not found token user in database");
    }

    const user = verifyJwt(token, keyToken.publicKey);

    req.user = user;
    next();
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  authorization,
};
