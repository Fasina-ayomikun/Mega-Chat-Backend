const CustomError = require("./cutomError");

class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}
module.exports = UnauthorizedError;
