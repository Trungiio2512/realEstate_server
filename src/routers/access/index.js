const express = require("express");
const errorHandler = require("../../middleware/errorHandler");
const AccessController = require("../../controllers/access.controller");
const { validate } = require("../../middleware/validation");
const { registerJoi, signinJoi } = require("../../utils/JoiSchema");

const router = express.Router();

router.post("/register", validate(registerJoi), errorHandler(AccessController.register));
router.post("/signin", validate(signinJoi), errorHandler(AccessController.signin));
router.post("/insert", errorHandler(AccessController.insert));

module.exports = router;
