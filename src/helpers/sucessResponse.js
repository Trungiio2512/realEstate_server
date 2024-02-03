const { StatusCodes, ReasonPhrases } = require("http-status-codes");

class SuccessResponse {
  constructor({
    message,
    metadata = {},
    statusCode = StatusCodes.OK,
    reasonStatusCode = ReasonPhrases.OK,
  }) {
    this.status = statusCode;
    this.message = message;
    this.metadata = metadata;
    this.reasonStatusCode = reasonStatusCode;
  }
  send(res, header = {}) {
    return res.status(this.status).json(this);
  }
}

module.exports = { SuccessResponse };
