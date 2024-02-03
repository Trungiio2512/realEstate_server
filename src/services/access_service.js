const { User } = require("../models/user");

const resgister = async (payload) => {
  const { phone, email, password, role } = payload;
  return payload;
};

module.exports = {
  resgister,
};
