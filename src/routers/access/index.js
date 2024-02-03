const express = require("express");
const errorHandler = require("../../helpers/errorHandler");
const AccessController = require("../../controllers/access.controller");
const { validate } = require("../../middleware/validation");
const { registerJoi } = require("../../utils/JoiSchema");

const router = express.Router();

router.post("/register", validate(registerJoi), errorHandler(AccessController.register));

module.exports = router;
