const db = require("../models");
const { Op } = require("sequelize");
const { ErrorResponse, Unauthorized, ServerErorr, Forbidden } = require("../helpers/errorResponse");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { createToken } = require("../middleware/jsonwebtoken");
const { getTokenPair, createTokenPair } = require("./keyToken_service");
const { roles } = require("../utils/contants");
class AccessService {
  static resgister = async (payload) => {
    const { phone, password, roleCode } = payload;
    if (roleCode === "ROL1") throw new Forbidden("Role code not allowed");
    const [user, created] = await db.User.findOrCreate({
      where: { phone },
      defaults: {
        phone,
        password,
        roleCode,
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
    console.log(publicKey);
    const { accessToken, refreshToken } = await createToken(
      { uid: user?.id, roleCode: user?.roleCode, phone: user?.phone },
      publicKey,
      privateKey
    );

    const data = await createTokenPair(user.id, publicKey, privateKey, refreshToken);
    // const data = await getTokenPair(user.id);
    if (!data) {
      throw new ServerErorr("Cannot set token pair");
    }

    return { user, token: accessToken, refreshToken };
  };
  static insert = async (payload) => {
    const data = await db.Role.bulkCreate(payload);

    return { data };
  };
}

module.exports = AccessService;
