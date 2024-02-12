const Joi = require("joi");

const description = Joi.string().trim().optional();
const name = Joi.string().trim().required();
const image = Joi.string().trim().required();
const address = Joi.string().trim().optional();
const phone = Joi.string()
  .regex(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)
  .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
  .required();

const email = Joi.string()
  .trim()
  .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
  .optional();

const password = Joi.string().trim().min(3).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"));
const confirmPassword = Joi.any().valid(Joi.ref("password")).optional();

const roleCode = Joi.string().optional();

const registerJoi = Joi.object().keys({
  password,
  confirmPassword,
  roleCode,
  name,
  address,
  phone,
  email,
  address,
});

const signinJoi = Joi.object().keys({
  phone,
  password,
});

const propertyType = Joi.object().keys({
  name,
  description,
  image,
});
module.exports = {
  registerJoi,
  signinJoi,
  propertyType,
};
