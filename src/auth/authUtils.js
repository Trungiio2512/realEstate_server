const errorHandler = require("../helpers/errorHandler");
const { Forbidden, NotFound } = require("../helpers/errorResponse");
const db = require("../models");
const { getTokenPair } = require("../services/keyToken_service");
const { HEADER } = require("../utils/contants");
const jwt = require("jsonwebtoken");
const verifyJwt = (token, sceretKey) => {
  return jwt.verify(token, sceretKey);
};
const authorization = errorHandler(async (req, res, next) => {
  const isToken =
    req.headers["x-access-token"] || req.headers["authorization"].startsWith("Bearer");

  if (!isToken) {
    return res.status(403).json({ status: "error", code: 403, message: "Porbidden" });
  }
  const token = req?.headers["authorization"].replace(/^Bearer\s+/, "");

  const userId = req.headers[HEADER.CLIENT_ID];

  if (!userId) {
    return res.status(403).json({ status: "error", code: 403, message: "Missing client id" });
  }

  try {
    const keyToken = await getTokenPair(userId);
    if (!keyToken) {
      throw new NotFound("Not found token user in database");
    }

    console.log(keyToken.publicKey);
    const user = verifyJwt(token, keyToken.publicKey);

    req.user = { ...user };
    next();
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  authorization,
};
