const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const corsOptions = require("./src/config/cors");
require("dotenv").config();

/** check connect db
 * 1: db connected app run
 * 2: else return log error connect db
 */
const startServer = () => {
  const app = express();

  // !cors config
  app.use(cors(corsOptions));

  // !init config
  app.use(helmet());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  // !router
  app.use("/", require("./src/routers"));
  // !when router error
  app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    console.log(error.stack);
    const statusCode = error?.status || 500;
    return res.status(statusCode).json({
      status: "error",
      code: statusCode,
      stack: error.stack,
      message: error.message || "Internal Server Error",
    });
  });

  const port = process.env.PORT_DEV || 8888;
  app.listen(port, () => {
    console.log("server listening on port ", port);
  });

  process.on("SIGINT", () => {
    server.close(() => console.log("Exit sever express"));
  });
};

(() => {
  try {
    console.log("1: starting connect database");
    require("./src/db/connect");
    console.log("2: connected to database");
    startServer();
  } catch (error) {
    console.log(error);
    process.on("", () => {
      server.close(() => console.log("Exit sever express"));
    });
  }
})();
