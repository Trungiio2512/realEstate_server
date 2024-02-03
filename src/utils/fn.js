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
module.exports = {
  removeKeyInvalid,
};
