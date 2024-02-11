const db = require("../models");
const { Op } = require("sequelize");
const { ErrorResponse, Unauthorized, ServerErorr } = require("../helpers/errorResponse");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { createToken } = require("../middleware/jsonwebtoken");
const { getTokenPair, createTokenPair } = require("./keyToken_service");
class AccessService {
  static resgister = async (payload) => {
    const { phone, password, role } = payload;
    if (role === "admin") {
      throw new ErrorResponse("You are not allowed to register");
    }
    const [user, created] = await db.User.findOrCreate({
      where: { phone },
      defaults: {
        phone,
        password,
        role,
      },
    });
    if (!created) {
      throw new ErrorResponse("User has existing");
    }
    return { created };
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

    const { accessToken, refreshToken } = await createToken(
      { uid: user?.id },
      publicKey,
      privateKey
    );

    const data = await createTokenPair(user.id, publicKey, privateKey, refreshToken);
    // const data = await getTokenPair(user.id);
    if (!data) {
      throw new ServerErorr("Cannot set token pair");
    }

    return { user, token: accessToken, refreshToken, data };
  };
}

module.exports = AccessService;
