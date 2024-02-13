const { client } = require("../config/redis.config");
const errorHandler = require("./errorHandler");
const { GetwayTimeout } = require("../helpers/errorResponse");
const limitedCallApi = (number) => {
  return errorHandler(async (req, res, next) => {
    const { uid } = req.user;
    const timeCall = Date.now();
    const clientConnect = await client.hGetAll(`client_limit:${uid}`);
    if (!Object.keys(clientConnect)?.length === 0) {
      await client.hSet(`client_limit:${uid}`, "time", timeCall);
      await client.hSet(`client_limit:${uid}`, "count", 1);
      next();
    }
    if ((timeCall - +clientConnect["time"]) / 1000 > 60) {
      await client.hSet(`client_limit:${uid}`, "time", timeCall);
      await client.hSet(`client_limit:${uid}`, "count", 1);
      next();
    }
    if (+clientConnect["count"] > number) {
      throw new GetwayTimeout(`You can not connect more than ${number} times`);
    }

    await client.hSet(`client_limit:${uid}`, "time", timeCall);
    await client.hSet(`client_limit:${uid}`, "count", +clientConnect.count + 1);
    next();
  });
};
module.exports = limitedCallApi;
