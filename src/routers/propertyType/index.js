const express = require("express");
const errorHandler = require("../../middleware/errorHandler");
const PropertyTypeController = require("../../controllers/propertyType.controller");
const { validate } = require("../../middleware/validation");
const { propertyType } = require("../../utils/JoiSchema");
const { permission } = require("../../auth/permission");
const { roles } = require("../../utils/contants");
const { authorization } = require("../../auth/authUtils");
const limitedCallApi = require("../../middleware/redis.middleware");

const router = express.Router();

router.use(authorization);
router.use(limitedCallApi(5));
router.get("/", errorHandler(PropertyTypeController.gets));

router.use(permission(["ROL1", "ROL2"]));
router.post("/", validate(propertyType), errorHandler(PropertyTypeController.create));

module.exports = router;
