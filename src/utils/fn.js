require("dotenv").config();

const removeKeyInvalid = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      removeKeyInvalid(obj[key]);
    }
    if (obj[key] === undefined || obj[key] === null) {
      delete obj[key];
    }
  });
  return obj;
};

const getEnvVariable = (key) => {
  const value = process.env[key];

  if (!value || value.length === 0) {
    console.error(`The environment variable ${key} is not set.`);
    throw new Error(`The environment variable ${key} is not set.`);
  }

  return value;
};

module.exports = {
  removeKeyInvalid,
  getEnvVariable,
};
