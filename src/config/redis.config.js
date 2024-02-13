const redis = require("redis");
// Tạo kết nối tới Redis Cloud
const client = redis.createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASS}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

const redisConnect = async () => {
  client.on("error", (err) => console.log("Redis client Error", err));

  await client.connect();
};

module.exports = {
  redisConnect,
  client,
};
