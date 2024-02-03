const Joi = require("joi");

const fisrtName = Joi.string().trim().optional();
const lastName = Joi.string().trim().optional();
const phone = Joi.string()
  .regex(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)
  .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
  .required();

const email = Joi.string()
  .trim()
  .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } });

const password = Joi.string().trim().min(3).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"));
const passworConfirmation = Joi.any().valid(Joi.ref("password")).optional();

const role = Joi.number().required();

const registerJoi = Joi.object().keys({
  email,
  password,
  passworConfirmation,
  role,
  fisrtName,
  lastName,
  phone,
});

module.exports = {
  registerJoi,
};
