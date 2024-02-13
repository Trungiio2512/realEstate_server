const { SuccessResponse, Created } = require("../helpers/sucessResponse");
const PropertyTypeService = require("../services/propertyType_service");
class PropertyTypeController {
  static async create(req, res) {
    new Created({ metadata: await PropertyTypeService.create(req.body) }).send(res);
  }
  static async gets(req, res) {
    new SuccessResponse({ metadata: await PropertyTypeService.gets(req.query) }).send(res);
  }
}

module.exports = PropertyTypeController;
