const db = require("../models");
const { Op } = require("sequelize");
const { ErrorResponse, Unauthorized } = require("../helpers/errorResponse");
const bcrypt = require("bcrypt");
class AccessService {
  static resgister = async (payload) => {
    const { phone, email, password, role } = payload;
    console.log(payload);
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
    return user;
  };
}

module.exports = AccessService;
