const express = require("express");
const errorHandler = require("../../helpers/errorHandler");
const PropertyTypeController = require("../../controllers/propertyType.controller");
const { validate } = require("../../middleware/validation");
const { propertyType } = require("../../utils/JoiSchema");
const { permission } = require("../../auth/permission");
const { roles } = require("../../utils/contants");
const { authorization } = require("../../auth/authUtils");

const router = express.Router();

router.get("/", errorHandler(PropertyTypeController.gets));

router.use(authorization);
router.use(permission(["ROL1", "ROL2"]));
router.post("/", validate(propertyType), errorHandler(PropertyTypeController.create));

module.exports = router;
