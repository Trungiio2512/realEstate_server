const { SuccessResponse } = require("../helpers/sucessResponse");
const { resgister } = require("../services/access_service");
class AccessController {
  static async register(req, res) {
    new SuccessResponse({ metadata: await resgister(req.body) }).send(res);
  }
}

module.exports = AccessController;
