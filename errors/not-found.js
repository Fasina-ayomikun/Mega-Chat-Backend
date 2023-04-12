const CustomError = require("./cutomError");

class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}
module.exports = NotFoundError;
