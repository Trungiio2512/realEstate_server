const db = require("../models");
const { Op } = require("sequelize");
const { ErrorResponse, Unauthorized } = require("../helpers/errorResponse");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { createToken } = require("../utils/jsonwebtoken");
class AccessService {
  static resgister = async (payload) => {
    const { phone, password, role } = payload;
    if (role === "admin") {
      throw new ErrorResponse("You are not allowed to register");
    }
    const [user, created] = await db.User.findOrCreate({
      where: { phone },
      defaults: {
        ...payload,
      },
    });
    if (!created) {
      throw new ErrorResponse("User has existing");
    }
    return user;
  };
  static signin = async (payload) => {
    const { phone, password } = payload;
    const user = await db.User.findOne({ where: { phone } });
    if (!user) {
      throw new Unauthorized("User not found");
    }
    const truePass = bcrypt.compareSync(password, user?.password);

    if (!truePass) {
      throw new Unauthorized("Password incorrect");
    }

    // create public key, private key => return access token and refresh token
    //=> savve model public, private, access, refresh
    //=> return data with access token and refresh token save in cookie
    const publicKey = crypto.randomBytes(64).toString("hex");
    const privateKey = crypto.randomBytes(64).toString("hex");

    const tokens = await createToken({ uid: user?.id }, publicKey, privateKey);
    return { user, tokens };
  };
}

module.exports = AccessService;
