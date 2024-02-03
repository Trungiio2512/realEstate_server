const { StatusCodes, ReasonPhrases } = require("http-status-codes");

class SuccessResponse {
  constructor({
    message,
    metadata = {},
    statusCode = StatusCodes.OK,
    reasonStatusCode = ReasonPhrases.OK,
  }) {
    this.status = statusCode;
    this.message = !message ? reasonStatusCode : message;
    this.metadata = metadata;
    this.reasonStatusCode = reasonStatusCode;
  }
  send(res, header = {}) {
    console.log("payload: ", this);
    return res.status(this.status).json(this);
  }
}

class Created extends SuccessResponse {
  constructor({
    message,
    metadata,
    statusCode = StatusCodes.CREATED,
    reasonStatusCode = ReasonPhrases.CREATED,
  }) {
    super({ message, statusCode, metadata, reasonStatusCode });
  }
}

module.exports = { SuccessResponse, Created };
