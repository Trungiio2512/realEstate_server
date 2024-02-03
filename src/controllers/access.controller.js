const { SuccessResponse, Created } = require("../helpers/sucessResponse");
const AccessService = require("../services/access_service");
class AccessController {
  static async register(req, res) {
    new Created({ metadata: await AccessService.resgister(req.body) }).send(res);
  }
  static async signin(req, res) {
    new SuccessResponse({ metadata: await AccessService.signin(req.body) }).send(res);
  }
}

module.exports = AccessController;
