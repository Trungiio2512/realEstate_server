const errorHandler = require("../middleware/errorHandler");
const { Unauthorized } = require("../helpers/errorResponse");
const db = require("../models");
const permission = (permissions) => {
  return errorHandler(async (req, res, next) => {
    const { roleCode } = req.user;
    if (!roleCode) {
      throw new Unauthorized("Missing role code in token request");
    }
    // const roles = await db.Role.findAll();
    // console.log(roles);
    // permissions.forEach((permission) => {
    //   if (!roles.includes(permission)) {
    //     throw new Unauthorized("List permission has not in database");
    //   }
    // });
    if (!permissions.includes(roleCode)) {
      throw new Unauthorized("You not allowed to access this resource");
    }
    next();
  });
};
module.exports = {
  permission,
};
