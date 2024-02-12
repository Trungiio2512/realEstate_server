const express = require("express");
const { route } = require("./propertyType");
const { authorization } = require("../auth/authUtils");

const router = express.Router();

router.use("/v1/api", require("./access"));

router.use("/v1/api/property_type", require("./propertyType"));

module.exports = router;
