const { SuccessResponse, Created } = require("../helpers/sucessResponse");
const AccessService = require("../services/access_service");
const { roles } = require("../utils/contants");
class AccessController {
  static async register(req, res) {
    new Created({ metadata: await AccessService.resgister(req.body) }).send(res);
  }
  static async signin(req, res) {
    const data = await AccessService.signin(req.body);
    const { refreshToken, ...passData } = data;
    res.cookie("REFRESH_TOKEN", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    new SuccessResponse({ metadata: passData }).send(res);
  }
  static async insert(req, res) {
    new Created({ metadata: await AccessService.insert(roles) }).send(res);
  }
}

module.exports = AccessController;
