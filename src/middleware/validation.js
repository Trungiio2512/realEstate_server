const { ErrorResponse } = require("../helpers/errorResponse");
const validate = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      //   console.log("error", message);
      throw new ErrorResponse(message);
    }
  };
};
module.exports = {
  validate,
};
